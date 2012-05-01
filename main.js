
// Module dependencies

var fs = require('fs'),
  path = require('path'),
  util = require('util'),
  hogan = require('hogan'),
  stream = require('stream'),
  marked = require('marked');

marked.setOptions({
  gfm: true
});

module.exports = HelpFile;
HelpFile.template = hogan.compile(fs.readFileSync(path.join(__dirname, 'tmpl.mustache'), 'utf8'));

//
// Basic markdown to vim helpfile generator.
//

function HelpFile(opts) {
  this.readable = true;
  this.writable = true;
  this.chunks = [];
  this.opts = opts || {};
  stream.Stream.call(this);
}

util.inherits(HelpFile, stream.Stream);

HelpFile.prototype.write = function(chunk) {
  this.chunks = this.chunks.concat(chunk);
};

HelpFile.prototype.end = function() {
  // parse streaming markdown
  var data = this.parse(this.chunks.join(''));
  // render template
  var content = HelpFile.template.render(data);
  this.emit('data', content);
  this.emit('end');
};

HelpFile.prototype.parse = function(body) {
  var tokens = marked.lexer(body);

  // name is the first heading element found
  // description is the first non heading element found (say a <p />)
  // sections are divided each time a <h2 /> element is found.
  return new Tokens(tokens, this.opts).data;
};

function Tokens(tokens, opts) {
  this.tokens = tokens;
  this.data = {
    name: opts.name || '',
    desc: opts.desc || '',
    sections: []
  };

  this.init();
}

// parse tokens, build data
Tokens.prototype.init = function() {
  var data = this.data,
    self = this;

  this.tokens.forEach(function(t) {
    // p node handled by text handler
    var type = t.type === 'paragraph' ? 'text' : t.type;
    if(!self[type]) return;
    self[type](t);
  });
};

Tokens.prototype.heading = function(t) {
  t.text = t.text.trim();
  // set name if not def
  this.data.name = this.data.name || t.text;

  // build a new section
  var s = this.data.sections;
  this.last = s[s.length] = {
    title: t.text,
    // todo: very crude regexp helper, rework
    slug: t.text.replace(/[^\w]+/g, ''),
    id: t.text.replace(/\s*/g, ''),
    parts: []
  };
};

Tokens.prototype.text = function(t) {
  this.data.desc = this.data.desc || t.text.trim();
  this.last.parts.push({ body: t.text.trim() });
};

Tokens.prototype.code = function(t) {
  t.text = ['>', t.text.split('\n'), '<'].join('\n');
  this.last.parts.push({ body: t.text });
};

