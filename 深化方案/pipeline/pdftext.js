ObjC.import('PDFKit');
ObjC.import('Foundation');
var inPath = $.NSProcessInfo.processInfo.environment.objectForKey('PDF_IN');
var outPath = $.NSProcessInfo.processInfo.environment.objectForKey('PDF_OUT');
var doc = $.PDFDocument.alloc.initWithURLOptionsError($.NSURL.fileURLWithPath(inPath), $(), Ref());
if (!doc) { console.log('FAIL ' + inPath); }
else {
  var text = doc.string;
  $(text).dataUsingEncoding(NSUTF8StringEncoding).writeToFileAtomicallyEncodingError(outPath, true, $());
  console.log('OK ' + inPath + ' chars=' + text.length);
}
