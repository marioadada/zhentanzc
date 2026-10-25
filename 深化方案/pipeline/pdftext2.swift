import Foundation
import PDFKit
import Quartz
let a = CommandLine.arguments
guard a.count >= 3, let doc = PDFDocument(url: URL(fileURLWithPath: a[1])) else { exit(1) }
var out = ""
for i in 0..<doc.pageCount {
    guard let page = doc.page(at: i) else { continue }
    let ctx = CGContext(data: nil, width: 1, height: 1, bitsPerComponent: 8, bytesPerRow: 0,
        space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.none.rawValue)!
    ctx.setFillColor(CGColor(red: 1, green: 1, blue: 1, alpha: 1))
    ctx.fill(CGRect(x: 0, y: 0, width: 1, height: 1))
    ctx.translateBy(x: 0, y: 1); ctx.scaleBy(x: 1, y: -1)
    page.draw(with: .mediaBox, to: ctx)
    guard let cg = ctx.makeImage() else { continue }
    let rep = NSBitmapImageRep(cgImage: cg)
    guard let t = rep.representation(using: .png, properties: [:]) else { continue }
    let img = NSImage(data: t)!
    var rect = CGRect(origin: .zero, size: img.size)
    if let cg2 = img.cgImage(forProposedRect: &rect, context: nil, hints: nil) {
        let ts = CGPDFScannerCreate(kCGPDFScannerCopyString, cg2, nil)
        if let ts2 = ts { CGPDFScannerScan(ts2, out, nil) }
    }
}
try? out.write(toFile: a[2], atomically: true, encoding: .utf8)
print("OK chars=\(out.count)")
