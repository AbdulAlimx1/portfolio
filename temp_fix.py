import re

# File path
file_path = r"d:\Project\Abdul Alim Portfoliw\react\this is good\src\App.tsx"

# Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the start line (containing valueEn: "5+",)
start_idx = None
end_idx = None

for i, line in enumerate(lines):
    if 'valueEn: "5+"' in line:
        start_idx = i
        print(f"Found broken stats array start at line {i+1}: {line.strip()}")
    
    if start_idx is not None and '{/* -- PART 2: My Journey Timeline -- */}' in line:
        end_idx = i
        print(f"Found timeline marker at line {i+1}: {line.strip()}")
        break

if start_idx is not None and end_idx is not None:
    print(f"\nDeleting lines {start_idx+1} to {end_idx} (keeping line {end_idx+1})")
    
    # Delete lines from start_idx to end_idx (exclusive)
    # We need to find where the stats object/array starts
    # Let's look backwards from start_idx to find the opening bracket/brace
    search_start = start_idx
    for i in range(start_idx - 1, -1, -1):
        if 'const stats' in lines[i] or 'const filteredStats' in lines[i]:
            search_start = i
            print(f"Found stats declaration at line {i+1}")
            break
    
    # Create new content without the broken section
    new_lines = lines[:search_start] + lines[end_idx:]
    
    # Write the file back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    
    print(f"\nFile saved successfully!")
    print(f"Deleted {end_idx - search_start} lines")
    
    # Show context around the fix
    print(f"\n{'='*80}")
    print(f"CONTEXT AFTER FIX (lines around the deletion point):")
    print(f"{'='*80}\n")
    
    context_start = max(0, search_start - 3)
    context_end = min(len(new_lines), search_start + 10)
    
    for i in range(context_start, context_end):
        line_num = i + 1
        print(f"{line_num:4d}: {new_lines[i]}", end='')
else:
    print("Could not find both start and end markers!")
    if start_idx is not None:
        print(f"Start found at line {start_idx+1}")
    if end_idx is not None:
        print(f"End found at line {end_idx+1}")
