" markdown-helpfile - Generate vim helpfile from markdown
" Maintainer:   mklabs

if exists("g:loaded_markdown_helpfile") || v:version < 700 || &cp
  finish
endif
let g:loaded_markdown_helpfile = 1

let s:dirname = expand('<sfile>:p:h:h')
let s:nodescr = join([s:dirname, 'bin', 'vim-helpfile'], '/')

" main command handler
function! s:MarkdownToHelp(first,last)
  let lines = s:HelpFile(a:first, a:last)
  call setline(a:first, lines)
  set ft=help
endfunction

function! s:HelpFile(first, last)
  " Detect range
  if a:first == a:last
    " Skip a possible shebang line, e.g. for node.js script.
    if getline(1)[0:1] == "#!"
      let b:firstline = 2
    else
      let b:firstline = 1
    endif
    let b:lastline = '$'
  else
    let b:firstline = a:first
    let b:lastline = a:last
  endif

  let lines = join(getline(b:firstline, b:lastline), "\n")

  let output = system('node ' . s:nodescr, lines)
  return split(output, '\n', 0)
endfunction

" wrapper function to define command only on md buffer
function! s:LoadMarkdownHelp()
  command! -buffer -range=% -nargs=? MarkdownToHelp call s:MarkdownToHelp(<line1>,<line2>)
endfunction


autocmd! BufRead,BufNewFile *.{md,markdown,mdown,mkd,mkdn} call s:LoadMarkdownHelp()


" vim:set sw=2 sts=2:

