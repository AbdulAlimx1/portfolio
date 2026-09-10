$path = 'd:\Project\Abdul Alim Portfoliw\react\this is good\src\index.css'
$text = Get-Content -Path $path -Raw
$old = "html,`nbody {`n  scroll-behavior: smooth;`n  scroll-padding-top: 5rem;`n}`n`n[id] {`n  scroll-margin-top: 5rem;`n}`n`nsection[id]::before {`n  content: \"\";`n  display: block;`n  height: 5rem;`n  margin-top: -5rem;`n  visibility: hidden;`n  pointer-events: none;`n}`n"
$new = "html,`nbody {`n  scroll-behavior: smooth;`n  scroll-padding-top: 6rem;`n}`n`n[id],`nsection[id] {`n  scroll-margin-top: 6rem;`n}`n`nsection[id]::before {`n  content: \"\";`n  display: block;`n  height: 6rem;`n  margin-top: -6rem;`n  visibility: hidden;`n  pointer-events: none;`n}`n"
if ($text -notlike "*$old*") { Write-Host 'OLD TEXT NOT FOUND'; exit 1 }
Set-Content -Path $path -Value ($text.Replace($old, $new))
Write-Host 'updated'
