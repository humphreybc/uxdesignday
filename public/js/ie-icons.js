/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'uxdesignday\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-ticket' : '&#xe000;',
			'icon-users' : '&#xe001;',
			'icon-flag' : '&#xe002;',
			'icon-calendar' : '&#xe003;',
			'icon-facebook' : '&#xe004;',
			'icon-twitter' : '&#xe005;',
			'icon-googleplus' : '&#xe006;',
			'icon-github' : '&#xe007;',
			'icon-more' : '&#xe008;',
			'icon-book' : '&#xe009;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; i < els.length; i += 1) {
		el = els[i];
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};