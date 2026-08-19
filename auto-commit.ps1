param(
  [string]$Branch = "main",
  [int]$DebounceSeconds = 8
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw "Git is not available on PATH. Install Git and try again."
}

# Track whether a meaningful change happened and wait for a short quiet period.
$global:PendingChange = $false
$global:LastEventAt = Get-Date

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $PSScriptRoot
$watcher.IncludeSubdirectories = $true
$watcher.Filter = "*.*"
$watcher.EnableRaisingEvents = $true

$action = {
  $path = $Event.SourceEventArgs.FullPath
  if ($null -ne $path -and ($path -match "\\\\\.git\\\\" -or $path -match "\\\\node_modules\\\\")) {
    return
  }

  $global:PendingChange = $true
  $global:LastEventAt = Get-Date
}

Register-ObjectEvent -InputObject $watcher -EventName Changed -Action $action | Out-Null
Register-ObjectEvent -InputObject $watcher -EventName Created -Action $action | Out-Null
Register-ObjectEvent -InputObject $watcher -EventName Deleted -Action $action | Out-Null
Register-ObjectEvent -InputObject $watcher -EventName Renamed -Action $action | Out-Null

Write-Host "Auto-commit watcher started in $PSScriptRoot"
Write-Host "Target branch: $Branch | Debounce: $DebounceSeconds seconds"
Write-Host "Press Ctrl+C to stop."

while ($true) {
  if ($global:PendingChange) {
    $secondsQuiet = ((Get-Date) - $global:LastEventAt).TotalSeconds
    if ($secondsQuiet -ge $DebounceSeconds) {
      $global:PendingChange = $false

      $status = git status --porcelain
      if ([string]::IsNullOrWhiteSpace($status)) {
        continue
      }

      git add -A
      $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
      $message = "chore(auto): update $timestamp"

      git commit -m $message | Out-Null
      if ($LASTEXITCODE -ne 0) {
        Write-Warning "Commit skipped or failed."
        continue
      }

      git push origin $Branch | Out-Null
      if ($LASTEXITCODE -eq 0) {
        Write-Host "Committed and pushed: $message"
      } else {
        Write-Warning "Push failed. Commit is local and can be pushed later."
      }
    }
  }

  Start-Sleep -Milliseconds 500
}