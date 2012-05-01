
# markdown-helpfile

Generate vim helpfiles from markdown

`:h help-writing` -> http://vimdoc.sourceforge.net/htmldoc/helphelp.html#help-writing

## Synopsis

The `bin/vim-helpfile` script is a simple script parsing streaming
markdown to output the according vim helpfile.

You may `npm link` repo or install the tarball with `-g` option.

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

## vim plugin

This tool can also be used as a vim plugin. The plugin itself is a basic
wrapper to the node script previously described.

**Using pathogen**

```sh
$ cd ~/.vim/bundle
$ git clone git://github.com/mklabs/vim-markdown-helpfile.git
$ cd vim-markdown-helpfile && npm install
```

It provides a single command `:MarkdownToHelpfile`, only on `markdown` buffer type.

What it does:

* convert the whole markdown document as vim helpfile
* change filetype from markdown to `help` (`set ft=help`)

The command also accepts a range, so you may convert only a small part of your
markdown file. To see how it goes. Should it be useful.

That's pretty much all it does..

