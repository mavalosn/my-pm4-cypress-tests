export default{
    prrocessEvent: '(//div[@title="eventName"])[index]',
    recentlyDropedEvent: '[data-type="processmaker.components.nodes.eventName.Shape"]',
    zoomOutBtn: '[data-test="zoom-out"]',
    saveBtn: '[title="Save"]',
    saveBtnInPopUp: '//button[text()="Save"]',
    saveChangesModal: '//h5[text()="Commit Changes"]',
    addProcessBtn: '[aria-label="Create Process"]',
    nameTxtBx: '[name="name"]',
    descriptionTxtBx: '[name="description"]',
    saveBtnToAddProcess: '//button[text()="Save"]',
    screenForInputDropdown: '//label[text()="Screen for Input"]//following-sibling::div/div[@class="multiselect__select"]',
    screenInputTxtBx: '[placeholder="type here to search"]',
    screenDropdownOption: '//li[@role="option"]//span[text()="screenName"]',
    screenForDisplayDropdown: '//label[text()="Select a Display Screen"]//following-sibling::div/div[@class="multiselect__select"]',
    expandLoopActivityBtn: '[aria-label="Loop Activity"] button[aria-expanded="false"]',
    loopModeDropdown: '//legend[text()="Loop Mode"]/following-sibling::div/select',
    requestVarArrayTxtBx: '//label[text()="Request Variable Array"]/following-sibling::div/input',
    addManualTask: '[data-test="switch-to-manual-task"]',
    iterationTextBox: '//*[@data-cy="loopMaximum"]',
    conditionTextBox:'//*[@data-cy="loopCondition"]',
    searchInputProcess: '(//input[@placeholder="Search"])[1]',
    processIndex:'[class="container-fluid"] [class="lds-gear"]',
    activeIcon: '[title="ACTIVE"]',
    //searchBox: '(//div[contains(@class,"pagination-nav-item item")])[1]',
    searchBox:"(//button[@class='btn btn-primary'])[1]",
    configureBtn: '(//button[@class="btn btn-link"]//i)[2]',
    processNameInputTxt:'//span[text()="processName"]',
    processManagerDropdown: '//label[text()="Process Manager"]//following-sibling::div/div[@class="multiselect__select"]',
    processMangerInput: '//label[text()="Process Manager"]/parent::div//div//div//div/following-sibling::input',
    processInputTxt: '(//input[@class="multiselect__input"])[2]',
    processManagerDropdownOption: '//label[text()="Process Manager"]//parent::div//span[text()[normalize-space()="Admin User"]]',
    processManagerEditSaveBtn: '//label[text()="Status"]/parent::div/following-sibling::div//button[text()="Save"]',
    scripttaskBtn: '[data-test="switch-to-script-task"]',
    screenForScriptDropdown:'.multiselect__select',
    dataConnectorDropdown:'//label[text()="Select a Data Connector"]//following-sibling::div/div[@class="multiselect__select"]',
    dataConnectorInputtxtBx:'[placeholder="Select a Data Connector"]',
    dataconnectorListDropdown: '//label[text()="Select a Resource"]//following-sibling::div/div[@class="multiselect__select"]',
    dataConnectorListInputtxtBx:'[placeholder="Select a Resource"]',
    listInputoption: '//li[@role="option"]//span//span[text()[normalize-space()="listName"]]',
    nameInput:'[name="name"]',
    eventBasedGatewayBtn:"[data-test='switch-to-event-based-gateway']",
    intermediateSignalCatchEvent:"[data-test='switch-to-intermediate-signal-catch-event']",
    signalForInputDropdown: '//label[text()="Signal"]//following-sibling::div//div//div[@class="multiselect__select"]',
    signalInputTxtBx: '[placeholder="Select option"]',
    signalDropdownOption: '//li[@role="option"]//span[text()="signalName"]',
    configDropDown:"(//i[@class='when-opened fas fa-chevron-down accordion-arrow ml-auto'])[1]",
    assignRules:"//span[text()='Assignment Rules']",
    userDropDown:"[id='assignmentsDropDownList']",
    userGroupOption:"[value='user_group']",
    assignedUsersOption:"//label[text()='Assigned Users/Groups']/parent::div/child::div",
    useroption:"//li[@role='option']//span//span[contains(text(),'userName')]",
    usertxtInput:"(//*[@placeholder='type here to search'])[2]",
    responseMappingbtn:"//a[@data-cy='inspector-add-option']",
    responseMappingSrcInput:"[data-cy='inspector-option-value']",
    responseMappingVarInput:"[data-cy='inspector-option-key']",
    resMappingSaveBtn:"[data-cy='inspector-option-save']",
    resMappingEditOption:"//a[@data-cy='inspector-options-edit']",
    terminateEndEventBtn:"[data-test='switch-to-terminate-end-event']",
    pdfFileNameInput:"[name='PDF File Name']",
    searchInputBox:"#processIndex > #search-bar > :nth-child(1) > .flex-grow-1 > #search > .input-group > #search-box",
    searchctrl:"//i[@class='fas fa-search']",
    editctrl:"[title='Edit'] > .fas",
    loadingSpinnerProcess:"#processIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid",
    processTable: '//div[@id="processIndex"]/div[2]/div/div[2]/table/tbody/tr',
    importProcessBtn:"[id='import_process']",
    browseBtn: "[id='pre-import']>button",
    inputToFileUpload: "[id='import-file']",
        importBtn: "[id='card-footer-pre-import'] > button.btn.btn-secondary.ml-2",
        loadingProcessSpinner: "[class='fas fa-circle-notch fa-spin']",

    //Start Event
    webEntryTab:"[id='accordion-button-webentry']",
        webEntryUrl:"[id='webentry-entry-url']",
    signalStartEventBtn:'[data-test="switch-to-signal-start-event"]',
    variableNameTxtBx:'//label[text()="Variable Name"]//following-sibling::input',
    inclusiveGatewayBtn:'[data-test="switch-to-inclusive-gateway"]',
    parallelGatewayBtn:'[data-test="switch-to-parallel-gateway"]',
    configTimeBtn:'[id="accordion-button-inspector-accordion-intermediate-timer-event-timing-control"]',
    typeTimeControlDrpDwn:'[data-test="intermediateTypeSelect"]',
    timeIntervalBtn:'[class="form-control control repeat form-control"]',
    timeIntervalDrpDwn:'(//select[@class="custom-select"])[2]',
    webEntryDrpDwn:'[id="accordion-button-webentry"]',
    webEntrySelectListBtn:'[id="webentry-mode"]',
    completeActionSelectList:"//label[text()[normalize-space()='Completed Action']]/parent::div/select",
    associatedScreenForInput:'//label[text()="Screen Associated"]//following-sibling::div//div[@class="multiselect__select"]',
    associatedScreenInputTxtBx:'//label[text()="Screen Associated"]//following-sibling::div//div//input[@type="text"]',
    completedScreenForInput:'//label[text()="Screen For Completed"]//following-sibling::div//div[@class="multiselect__select"]',
    completedScreenInputTxtBx:'//label[text()="Screen For Completed"]//following-sibling::div//div//input[@type="text"]',
    //process manager
    clickonProcess: "[data-cy='Processes'] > .nav-link > .fas",
    ProcessPgVerify: "#nav-sources-tab",
    ProcessSearchBx: "(//input[@placeholder='Search'])[1]",
    clickOnSearchBtn: " (//button[@class='btn btn-primary'])[1]",
    processNameVerify: "//span[text()='name']",
    clickOnSetting: "//span[text()[normalize-space()='processName']]//ancestor::tr//button[@title='Configure']",
    clickOnPrcsMngrOpt: "(//div[@class='multiselect__select'])[2]",
    clickonPrcsMngrInpt: "//label[text()='Process Manager']/following::input[1]",
    selectAdminOption: "(//li[@class='multiselect__element']//span//span[text()[normalize-space()='Admin User']])[1]",
    saveProcessMngr: "(//button[text()='Save'])[1]",
    configurationTab: '[id="nav-home-tab"]',
    sucessToast: "//div[contains(@class,'alert d-none')]",
    boundaryEventBtn:'[data-test="boundary-event-dropdown"]',
   boundaryCondOptn:'[data-test="add-boundary-conditional-event"]',
   conditionInputBx:'[name="condition"]',
   outBoundplusBtn:"//a[@data-cy='inspector-add-outbound-option']",
   propertyTypeDrpDwn:"(//div[@data-cy='inspector-connector-property-type']//div)[1]",
   propertTypeValueInput:"//li[@class='multiselect__element']//span[@class='multiselect__option multiselect__option--highlight']//span[text()[normalize-space()='type']]",
   propertyDrpDwn:"(//div[@data-cy='inspector-connector-property']//div)[1]",
   propertValueInput:"//li[@class='multiselect__element']//span[@class='multiselect__option multiselect__option--highlight']//span[text()[normalize-space()='property']]",
   requestVarInputBx:'[data-cy="inspector-request-variable"]',
   outBoundSaveBtn:'[data-cy="inspector-option-save"]',
    versionHistoryTab: "[id='process-versions-tab']",
    editctrlBtn: "(//i[contains(@class,'fas fa-pen-square fa-lg fa-fw')])[1]",
    configctrlBtn: "(//i[contains(@class,'fas fa-cog fa-lg fa-fw')])[1]",
    viewctrlBtn: "(//i[contains(@class,'fas fa-map-signs fa-lg fa-fw')])[1]",
    loadingSpinnerProcess1: ".jumbotron.jumbotron-fluid",
    saveButton1: '[title="Save"] > .svg-inline--fa',
    rowsVersion: ".row.version.p-2",
    copyToLatests: ".fas.fa-copy",
    nameVersionInput: "#name",
    descriptionVersionInput: "#additional-details",
    container: ".container.container",
    onlyShowVersionLabel: ".p-3 > .custom-control > .custom-control-label",
    onlyShowNamedVersion: 'input[class="custom-control-input"]',
    confirmAndSave: ".card-footer > .btn-secondary",
    CategoryTxt: '[class="multiselect__tag"] span',
    vocabulariesOption: 'li[data-cy="Vocabularies"] > a[aria-label="Vocabularies"] > i[class="fas nav-icon fa-book"]',
    vocabulariesList: '//*[@id="vocabularyIndex"]/div[2]/div/div/table/tbody/tr',
    scriptOptionAccess: '//a[@aria-label="Scripts"]/i',
    scriptList: '//*[@id="scriptIndex"]/div[2]/div/div[2]/table/tbody/tr',
    dataConnectorsOptionAccess:  'li[data-cy="Data Connectors"] > a[aria-label="Data Connectors"]',
    dataConnectorList: '//*[@id="dataSourceIndex"]/div[2]/div[2]/table/tbody/tr',
    checkboxEnableDirectAPIAccess: '//input[@type="checkbox"]',
    saveScriptButton: '//button[@class="btn btn-secondary ml-2"]',
    selectScriptInScriptTask: '//div[@class="multiselect__select"]',
    processManagerAdmin:'(//li[@aria-label="Admin User. "]/span)[1]',

    //signal end event
    signalEndevent:"//button[text()='Signal End Event ']",
    signalpayloadBtn: "(//div[@class='multiselect__select'])[3]",
    clickOnAllRequestBtn: "//span[text()='All Request Data']",
    //signal start event
    signalStartevent:"//button[text()='Signal Start Event ']",
    clickonSignalOption:"(//div[@class='multiselect__select'])[1]",
    signalInputTxtBtn: "(//input[@class='multiselect__input'])[1]",
    signalDrpDownOption: "//span[text()='signalName']",
    verifySignalIsSelected:"//div[@class='multiselect__spinner']/following-sibling::span",
    //click on Form task comments button
    clickOnCommentsBtn:'[id="accordion-button-comments-accordion"]',
    enableTheComments:"//label[text()='Comments']",
    enableTheReaction:"//label[text()='Reactions']",
    enableTheVoting: "//label[text()='Voting']",
    enableTheEdit: "//label[text()='Edit']",
    enableTheDelete: "//label[text()='Delete']",
    //Create process with BPMN file and export
    categoryInput: ".multiselect__tags-wrap",
    nameProcessInModeler: '//*[@id="breadcrumbs"]/ol/li[5]/span',
    categoryListOptions: '[class="multiselect__content-wrapper"]',
    downloadBtn: "//button[text()='Download']",
    uploadBPMNBrowseButton: '[class="custom-file-input"]',
    saveBtnBPMN: "#createProcess___BV_modal_footer_ > .btn-secondary",
    exportBtn: "[title='Export'] > .fas",
    optionCategory:
        '//label[text()="Category"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]',
    labelCategory: '//label[text()="Category"]',
    menuSidebar: '[id="sidebar-inner"]',
    expandBtn: '[aria-label="Expand sidebar"]',
    optionFirstInMenuSidebar: '//*[@id="Sidebaricon"][1]',
    //add screen to end Event
    clickonscreenDrpDwn:"(//div[@role='combobox']//div)[1]",
    endScrnInptTxtBx:"//input[@placeholder='type here to search']",
    selectEndScreen:"//span[text()='name']",
    //Msg End Event
    clickOnMsgEndEvent :"//button[text()='Message End Event ']",
    //Msg Start Event
    clickOnMsgStartEvent :"//button[text()='Message Start Event ']",
    clickMsgReferenceDrpDwn :'[class="multiselect__select"]',
    clickOnMsgReferenceInpt : '[placeholder="Select option"]',
    //vocabularies
    createVocabBtn: "//button[@aria-label = 'Create Vocabulary']",
    vacabNameInput: "//input[@name = 'title']",
    vacabDescription: "//textarea[@name = 'description']",
    vacabSaveBtn: "//button[text()[normalize-space() = 'Save']]",
    clickOnvacabBtn: "//button[@id= 'accordion-button-vocabularies']",
    clickOnplus: "//button[@aria-label= 'Add']",
    clickOndropDown: "(//div[@class = 'multiselect__select'])[2]",
    vocabInput: "(//input[@type = 'text'])[2]",
    vocabDropdownOption: '//li[@role="option"]//span[text()="name"]',
    clickonSavevacab: "//button[text()[normalize-space() = 'Save']]"

}