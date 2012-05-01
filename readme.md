
# markdown-helpfile

Generate vim helpfiles from markdown

## Synopsis

The `bin/vim-helpfile` script is a simple script parsing streaming
markdown to output the according vim helpfile.

```sh
$ cat readme.md | markdown-helpfile

*markdown-helpfile.txt*	Generate vim helpfiles from markdown

|markdown-helpfile|		markdown-helpfile
|markdown-helpfile-Synopsis|		Synopsis

markdown-helpfile				*markdown-helpfile*

Generate vim helpfiles from markdown


Synopsis				*markdown-helpfile-Synopsis*

The `bin/vim-helpfile` script is a simple script parsing streaming
markdown to output the according vim helpfile.

>
    $ cat readme.md | markdown-helpfile
<


vim:tw=78:ts=8:ft=help:norl:
```

Or maybe

```sh
$ cat readme.md | markdown-helpfile > doc/myplugin.txt
$ vim doc/myplugin.txt
```


