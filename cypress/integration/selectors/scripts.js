export default {
    newScriptBtn: '(//i[@class="fas fa-plus"])[2]',
    NameInputTxtBx:
        "//div[@id='createScript___BV_modal_content_']//input[@name='title']",
    DescriptionTxtBx: '[class="form-group"] textarea',
    DropDownBtn: '[class="form-group"] select',
    SelectBx: "(//div[@class='multiselect__select'])[2]",
    SelectTxtInput:
        "//div[@id='createScript___BV_modal_content_']//div[@name='run_as_user_id']",
    SelectOptionValue:
        "//li[@class='multiselect__element']//span//span[text()='userfullName']",
    CreateSaveBtn: '(//button[@class="btn btn-secondary"])[2]',
    SaveBtn: '//button[text()="Save"]',
    saveVersionsBtn: "//div[@class='modal-footer']/button[text()='Publish']",
    scriptPublishBtn:
        '//div[@class="card-header"]//button[contains(text(),"Publish")]',
    debuggerTxt: '//div[text()="Debugger"]',
    InputTxtBx: '(//textarea[contains(@class,"inputarea")])[1]',
    InputBtn: '(//div[@class="view-line"])[11]',
    returnLine: '(//div[@class="view-line"])[13]',
    sucessToastMsg: "//div[contains(@class,'alert d-none')]",
    editctrlBtn: "(//i[contains(@class,'fas fa-pen-square fa-lg fa-fw')])[1]",
    configctrlBtn: "(//i[contains(@class,'fas fa-cog fa-lg fa-fw')])[1]",
    loadingSpinnerScript:
        "#scriptIndex > .container-fluid > .data-table > .jumbotron > .container > :nth-child(1)",
    searchInputBox: "[id='search'] input",
    versionHistoryTab: "[id='script-version-tab']",
    onlyShowVersionLabel: ".p-3 > .custom-control > .custom-control-label",
    alertSuccess:
        'div[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]',
    container: ".container.container",
    copyToLatest:
        ":nth-child(3) > .container > :nth-child(1) > .pl-0 > .row > :nth-child(1) > small > .text-secondary",
    confirmAndSave: ".card-footer > .btn-secondary",
    currentVersion:
        "#script-version > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1) > :nth-child(2)",
    onlyShowNamedVersion: 'input[class="custom-control-input"]',
    areaInputScript:
        '(//textarea[@class="inputarea monaco-mouse-cursor-text"])[1]',
    runScript: ".col-3 > .card > .card-header > .row > .text-right > .btn",
    inputName: '[placeholder="Version Name"]',
    inputDetail: '[placeholder="Additional Details (optional)"]',
    CategoryTxt: '[class="multiselect__tag"] span',
    timeoutTxt:
        "//fieldset/legend[text()='Timeout']//following-sibling::div//input[@type='number']",
    RetryAttemptsTxt:
        "//fieldset/legend[text()='Retry Attempts']//following-sibling::div//input[@type='number']",
    RetryWaitTimeTxt:
        "//fieldset/legend[text()='Retry Wait Time']//following-sibling::div//input[@type='number']",
    threePointsBtn:
        '//div[@id="main"]//ul/li/a[@id="nav-sources-tab"]//ancestor::div[@id="main"]//descendant::div[@id="scriptIndex"]//table/tbody/tr//button[@aria-haspopup="menu"]',
    directApiOption:
        "//label[contains(text(),'Enable Direct API access')]/ancestor::div[@class='form-group']//input[@type='checkbox']",
    searchField:
        "#scriptIndex > #search-bar > :nth-child(1) > .flex-grow-1 > #search > .input-group > #search-box",
    scriptTable: "//div[@data-cy='scripts-table']//table//tbody/tr",
    loadingSpinnerScript:
        "#scriptIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid",
};
