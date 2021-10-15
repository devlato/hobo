const preprocessor = require("./preprocessor")
// @ponicode
describe("preprocessor.process", () => {
    test("0", () => {
        let callFunction = () => {
            preprocessor.process("http://placeimg.com/640/480", "..ts.jspath/to/file.ext.ts./path/to/file")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            preprocessor.process("http://placeimg.com/640/480", ".tsx.js")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            preprocessor.process("http://placeimg.com/640/480", ".tsx.scss")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            preprocessor.process("http://placeimg.com/640/480", ".scss")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            preprocessor.process("http://placeimg.com/640/480", ".tsx.js.scss")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            preprocessor.process(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
