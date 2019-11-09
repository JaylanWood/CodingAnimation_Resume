let baseStr = `
/*这是一个会动的简历*/
* {
    transition: all 0.2s;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
html {
    background: #DDD;
}
#htmlCode{
    padding: 16px;
    border: 1px solid #1e1e1e;
    border-radius: 3px;
}
/*代码高亮*/
.token.selector{
    color: #690;
}
.token.property{
    color: #905;
}
.token.punctuation{
    color: #999;
}
.token.comment{
    color: slategray;
}
/*3D效果*/
#htmlCode{
    transform: rotate(360deg);
}
/*创建一个Paper*/
`

let paperStr = `
/*给code和paper分页展示*/
#htmlCode{
    position: fixed;
    left: 0;
    width: 50%;
    height:100%;
}
/*设置Paper的样式*/
#paper{
    position: fixed;
    right: 0;
    width: 50%;
    height:100%;
    background: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    border: 1px solid #1e1e1e;
    border-radius: 3px;
}
#paper > #content{
    background: #fff;
    height: 100%;
    width: 100%;
}
`
let markdownStr = `
# 这是我的简历
大家好
`
writeCode('', baseStr, 20, () => {
    createPaper(() => {
        writeCode(baseStr, paperStr, 20, () => {
            writeMarkdown('', markdownStr, 20)
        })
    })
})

function writeCode(preStr, addingStr, speed, fn) {
    let currentStr = preStr || ''
    let n = 0
    let id = setInterval(() => {
        n += 1
        currentStr += addingStr.slice(n - 1, n)
        htmlCode.innerHTML = Prism.highlight(currentStr, Prism.languages.css);
        cssCode.innerHTML = currentStr
        htmlCode.scrollTop = htmlCode.scrollHeight // 滚动到底
        if (n > addingStr.length) {
            window.clearInterval(id)
            fn && fn.call() // 异步，调用
        }
    }, 200 / speed)
}

function writeMarkdown(preStr, addingStr, speed, fn) {
    let currentStr = preStr || ''
    let n = 0
    let markdownCode = document.querySelector('#paper>#content')
    let id = setInterval(() => {
        n += 1
        currentStr += addingStr.slice(n - 1, n)
        markdownCode.innerHTML = Prism.highlight(currentStr, Prism.languages.markdown);
        if (n > addingStr.length) {
            window.clearInterval(id)
            fn && fn.call() // 异步，调用
        }
    }, 200 / speed)
}

function createPaper(fn) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.id = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn && fn.call() //同步，调用
}