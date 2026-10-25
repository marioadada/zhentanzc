import Foundation
import Vision
import AppKit

let a = CommandLine.arguments
guard a.count >= 3 else { print("usage: ocr <image> <out>"); exit(1) }
guard let img = NSImage(contentsOfFile: a[1]),
      let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    print("FAIL load"); exit(1)
}
let req = VNRecognizeTextRequest()
req.recognitionLevel = .accurate
req.recognitionLanguages = ["zh-Hans", "en-US"]
req.usesLanguageCorrection = true
let handler = VNImageRequestHandler(cgImage: cg, options: [:])
do { try handler.perform([req]) } catch { print("FAIL \(error)"); exit(1) }
let obs = req.results ?? []
let lines = obs.compactMap { $0.topCandidates(1).first?.string }
let text = lines.joined(separator: "\n")
try? text.write(toFile: a[2], atomically: true, encoding: .utf8)
print("OK \(a[1]) lines=\(lines.count) chars=\(text.count)")
