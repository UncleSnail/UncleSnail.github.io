'use strict';

var path = require('path');
var url = require('url');

module.exports = generateDirs;


/**
 * Finds the base dir common to two paths.
 * For example '/a/b/c/d' and '/a/b/c/x/y' have '/a/b/c' in common.
 *
 * @param {string} a - path a
 * @param {string} b - path b
 * @returns {string} - the base dir common to both paths
 */
function getCommonBaseDir(a, b) {
	var common = [];
	a = a.split(path.sep);
	b = b.split(path.sep);
	for (var i = 0; i < a.length; i++) {
		if (b[i] === undefined || b[i] !== a[i]) {
			break;
		}
		common.push(a[i]);
	}
	return common.join(path.sep);
}


function generateDirs(cssFilePathRel, urlMatch, options) {
	// Example:
	//   cssFilePathRel   = 'page\home.css'
	//   urlMatch         = '../../images/foo.png?a=123'
	//   options.base     = 'assets'

	// 'css\page'
	var cssFromDirRel = path.dirname(cssFilePathRel);
	// assetUrlParsed.pathname = '../../images/foo.png'
	var assetUrlParsed = url.parse(urlMatch);
	// '..\..\images\foo.png'
	var assetPath = assetUrlParsed.pathname.replace(/\//g, path.sep);
	// 'images\foo.png'
	var assetFromRel = path.join(cssFromDirRel, assetPath);
	// 'foo.png'
	var assetBasename = path.basename(assetFromRel);
	// 'images'
	var assetFromDirRel = path.dirname(assetFromRel);


	// '\'
	var fromBaseDirRel = getCommonBaseDir(assetFromDirRel, cssFromDirRel);
	// 'images'
	var assetPathPart = path.relative(fromBaseDirRel, assetFromDirRel);
	// 'assets\images'
	var newAssetPath = path.join(options.base, assetPathPart);
	// 'assets\images\foo.png'
	var newAssetFile = path.join(newAssetPath, assetBasename);

	// console.log(cssFromDirRel, assetPath, assetFromRel, assetBasename, assetFromDirRel, fromBaseDirRel, assetPathPart, newAssetPath, newAssetFile);

	// Call user-defined function
	if (options.pathTransform) {
		newAssetFile = options.pathTransform(newAssetFile, cssFilePathRel, urlMatch, options);
		newAssetPath = path.dirname(newAssetFile);
		assetBasename = path.basename(newAssetFile);
	}

	// 'foo.png?a=123'
	var urlBasename = assetBasename +
		(assetUrlParsed.search ? assetUrlParsed.search : '') +
		(assetUrlParsed.hash ? assetUrlParsed.hash : '');

	// 'url("../../images/foo.png?a=123")'
	var newUrl = 'url("' +
		path.relative(cssFromDirRel, newAssetPath).replace(new RegExp('\\'+path.sep, 'g'), '/') + '/' + urlBasename +
		'")';

	// Return the new url() string
	return {
		newUrl: newUrl,
		assetPath: assetPath,
		newAssetFile: newAssetFile
	};
}
