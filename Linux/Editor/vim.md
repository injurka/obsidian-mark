
1. The cursor is moved using either the arrow keys or the hjkl keys.
   - **h** (left)       **j** (down)       **k** (up)       **l** (right)

2. To start Vim from the shell prompt type:  vim FILENAME `<ENTER>`

3. To exit Vim type:     
   - `<ESC>`   **:q!**   `<ENTER>`  to trash all changes
   - `<ESC>`   **:wq**   `<ENTER>`  to save the changes.

4. To delete the character at the cursor type:  **x**

5. To insert or append text type:
    - **i**   type inserted text   `<ESC>`         insert before the cursor
    - **A**   type appended text   `<ESC>`         append after the line
```
NOTE: Pressing `<ESC>` will place you in Normal mode or will cancel
      an unwanted and partially completed command.
```

6. To delete from the cursor up to the next word type:        **dw**
7. To delete from the cursor up to the end of the word type:  **de**
8. To delete from the cursor to the end of a line type:       **d$**
9. To delete a whole line type:                               **dd**
10. To repeat a motion prepend it with a number:   **2w**
11. The format for a change command is:
```
 operator   [number]   motion
 where:
   operator - is what to do, such as  d  for delete
   [number] - is an optional count to repeat the motion
   motion   - moves over the text to operate on, such as  w (word),
			  e (end of word),  $ (end of the line), etc.
```

12. To move to the start of the line use a zero:  **0**
13. To undo previous actions, type:          **u**  (lowercase u)
 - To undo all the changes on a line, type:  **U**  (capital U)
 - To undo the undo's, type:                 **CTRL-R**

14. To put back text that has just been deleted, type   **p** .  This puts the
 deleted text AFTER the cursor (if a line was deleted it will go on the
 line below the cursor).

15. To replace the character under the cursor, type   **r**   and then the
 character you want to have there.

16. The change operator allows you to change from the cursor to where the
 motion takes you.  eg. Type  ce  to change from the cursor to the end of
 the word,  **c$**  to change to the end of a line.

17. The format for change is:
  - **c**   [number]   motion
    
 18. `CTRL-G`  displays your location in the file and the file status.
	- **G**  moves to the end of the file.
	- number  **G**  moves to that line number.
	- **gg**  moves to the first line.

  19. Typing  **/**  followed by a phrase searches `FORWARD` for the phrase.
     Typing  **?**  followed by a phrase searches `BACKWARD` for the phrase.
     After a search type  n  to find the next occurrence in the same direction
     or  **N**  to search in the opposite direction.
     `CTRL-O` takes you back to older positions, `CTRL-I` to newer positions.

  20. Typing  %  while the cursor is on a  `(,),[,],{, or }` goes to its match.

  21. To substitute new for the first old in a line type   `:s/old/new`
	- To substitute new for all 'old's on a line type       `:s/old/new/g`
	- To substitute phrases between two line #'s type       `:#,#s/old/new/g`
	- To substitute all occurrences in the file type       `:%s/old/new/g`
	- To ask for confirmation each time add 'c'             `:%s/old/new/gc`

22. **:!command**  executes an external command.
```
  Some useful examples are:
	 (Windows)        (Unix)
	  :!dir            :!ls            -  shows a directory listing.
	  :!del FILENAME   :!rm FILENAME   -  removes file FILENAME.
```

23.  **:w** `FILENAME`  writes the current Vim file to disk with name FILENAME.

24. **v**  motion  **:w** `FILENAME`  saves the Visually selected lines in file
  `FILENAME`.

25. **:r** `FILENAME`  retrieves disk file `FILENAME` and puts it below the
  cursor position.

26. **:r** `!dir`  reads the output of the dir command and puts it below the
  cursor position.

27. Type  **o**  to open a line `BELOW` the cursor and start Insert mode.
	 - Type  **O**  to open a line ABOVE the cursor.

28. Type  **a**  to insert text `AFTER` the cursor.
	 - Type  **A**  to insert text after the end of the line.

29. The  **e**  command moves to the end of a word.

30. The  **y**  operator yanks (copies) text,  p  puts (pastes) it.

31. Typing a capital  **R**  enters Replace mode until  `<ESC>`  is pressed.

32. Typing ":set xxx" sets the option "xxx".  Some options are:
	- 'ic' 'ignorecase'       ignore upper/lower case when searching
	- 'is' 'incsearch'        show partial matches for a search phrase
	- 'hls' 'hlsearch'        highlight all matching phrases
 > You can either use the long or the short option name.

33. Prepend "no" to switch an option off:   :set noic