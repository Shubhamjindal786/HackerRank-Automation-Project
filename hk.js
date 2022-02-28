const puppeteer = require("puppeteer");
const codeObj = require('./codes')
const email = 'shubhamfoundationclasses@gmail.com';
const password = ''
const loginLink = 'https://www.hackerrank.com/auth/login';

let browserOpen = puppeteer.launch({
    headless: false,

    args: ['--start-maximized'],
    defaultViewport: null
})

let page;

browserOpen.then(function(browserObj) {
    let browserOpenpromise = browserObj.newPage();
    return browserOpenpromise;
}).then(function(newTab) {
    page = newTab;
    let hackerRankOpenPromise = newTab.goto(loginLink);
    return hackerRankOpenPromise;
}).then(function() {
    let emailIsEntered = page.type("input[id='input-1']", email, { delay: 50 })
    return emailIsEntered;
}).then(function() {
    let passwordIsEntered = page.type("input[type='password']", password, { delay: 50 })
    return passwordIsEntered;
}).then(function() {
    let loginButtonClicked = page.click('button[data-analytics="LoginPassword"]', { delay: 50 })
    return loginButtonClicked;
}).then(function() {
    let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]', page)
    return clickOnAlgoPromise
}).then(function() {
    let getToWarm = waitAndClick('input[value="warmup"]', page)
    return getToWarm;
}).then(function() {
    let waitFor3Seconds = page.waitFor(3000)
    return waitFor3Seconds;
}).then(function() {
    let allChallengePromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', { delay: 50 })
    return allChallengePromise;
}).then(function(questionsArr) {
    console.log("Number of questions :", questionsArr.length);
    let questionWiilSolved = questionSolver(page, questionsArr[0], codeObj.answers[0]);
    return questionWiilSolved;
})



function waitAndClick(selector, cPage) {
    return new Promise(function(reslove, reject) {
        let waitForModelPromise = cPage.waitForSelector(selector)
        waitForModelPromise.then(function() {
            let clickModel = cPage.click(selector)
            return clickModel;
        }).then(function() {
            reslove()
        }).catch(function(err) {
            reject()
        })
    })
}



function questionSolver(page, question, answer) {
    return new Promise(function(reslove, reject) {
        let questionWillBeClicked = question.click()
        questionWillBeClicked.then(function() {
            let EditorInFocusPromise = waitAndClick('.monaco-editor.no-user-select.vs', page)
            return EditorInFocusPromise;
        }).then(function() {
            return waitAndClick('.checkbox-input', page);
        }).then(function() {
            return page.waitForSelector('textarea.custominput', page);
        }).then(function() {
            return page.type('textarea.custominput', answer, { delay: 10 });
        }).then(function() {
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then(function() {
            let Aispressed = page.keyboard.press('A', { delay: 100 });
            return Aispressed;
        }).then(function() {
            let Xispressed = page.keyboard.press('X', { delay: 100 });
            return Xispressed;
        }).then(function() {
            let CtrlisUnPressed = page.keyboard.up('Control');
            return CtrlisUnPressed;
        }).then(function() {
            let mainEditorInFocus = waitAndClick('.monaco-editor.no-user-select.vs', page);
            return mainEditorInFocus
        }).then(function() {
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then(function() {
            let Aispressed = page.keyboard.press('A', { delay: 100 });
            return Aispressed;
        }).then(function() {
            let Vispressed = page.keyboard.press('V', { delay: 100 });
            return Vispressed;
        }).then(function() {
            let CtrlisUnPressed = page.keyboard.up('Control');
            return CtrlisUnPressed;
        }).then(function() {
            return page.click('.hr-monaco__run-code', { delay: 50 });
        }).then(function() {
            reslove()
        }).catch(function(err) {
            reject();
        })
    })

}