describe('test todo function', function () {
    let page;

    before(async function () {
        page = await browser.newPage();
        await page.goto('http://127.0.0.1:3000/');
    });

    after(async function () {
        await page.close();
    });
    // 添加一个tood项目
    it('add new todo item', async function () {
        await page.click('#inputcontent', { delay: 500 });
        await page.type('#inputcontent', 'test add todo item', { delay: 50 });
        await page.click('#testid');
        let UndoneItems = await page.waitFor('#undo-items');
        const ExpectUndoItem = await page.evaluate(UndoneItems => UndoneItems.lastChild.querySelector('p').textContent, UndoneItems);
        expect(ExpectUndoItem).to.eql('test add todo item');
    })
    // 完成一个undo项目
    it("finish the new undo item",async function (){
        // 点击UndoItems项目里面的最后一个,也就是刚才添加的一个
        await page.click("table#undo-items div:last-child button",{delay:500})
        let DoneItems = await page.waitFor('#done-items');
        const ExpectDoneItem = await page.evaluate(DoneItems => DoneItems.firstChild.querySelector('p').textContent, DoneItems);
        expect(ExpectDoneItem).to.eql('test add todo item');
    })   
    // 删除一个done项目
    it("delete the new done item",async function (){
        // 删除刚才完成的项目
        await page.click("table#done-items div:first-child button",{delay: 500})
        let doneItemStatus = await page.waitFor('#doneItemStatus')
        const content = await page.evaluate(doneItemStatus=>doneItemStatus.textContent,doneItemStatus)
        expect(content).to.eql("没有完成代办事项")
    })
});

