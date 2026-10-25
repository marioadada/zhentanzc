import Foundation
import PDFKit
let a = CommandLine.arguments
guard a.count >= 3, let doc = PDFDocument(url: URL(fileURLWithPath: a[1])) else {
    print("FAIL \(a.count > 1 ? a[1] : "?")"); exit(1)
}
print("OK \(a[1]) pages=\(doc.pageCount) chars=\(doc.string?.count ?? 0)")
if let t = doc.string { try? t.write(toFile: a[2], atomically: true, encoding: .utf8) }
