$ErrorActionPreference = "Stop"

$files = @(
  @{
    Source = "tasks/current.example.md"
    Destination = "tasks/current.md"
  },
  @{
    Source = "tasks/backlog.example.md"
    Destination = "tasks/backlog.md"
  },
  @{
    Source = ".ai/memory/personal.example.md"
    Destination = ".ai/memory/personal.md"
  }
)

foreach ($file in $files) {
  if (-not (Test-Path $file.Source)) {
    Write-Warning "Template not found: $($file.Source)"
    continue
  }

  if (Test-Path $file.Destination) {
    Write-Host "Skipped existing file: $($file.Destination)"
    continue
  }

  Copy-Item $file.Source $file.Destination
  Write-Host "Created: $($file.Destination)"
}
