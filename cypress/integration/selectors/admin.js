export default{
    searchInputBox:"[id='search'] input",
    searchctrl:"//i[@class='fas fa-search']",
    RecordBtnForGivenCollection:" //span[text()[normalize-space()='collectionName']]//ancestor::tr//a[@title='Records']",
    RecordsBtn: '[title="Records"]',
    collectionNameInput:"//span[text()='collectionName']",
    newCollectionBtn:'[aria-label="Create Collection"]',
    nameInputTxtBx:'[id="name"]',
    descriptionInputTxtBx:'[id="description"]',
    createscreenForInputDropdown: '//label[normalize-space(text())="Create Screen"]//following-sibling::div/div',
    createscreenInputTxtBx: '[name="create_screen_id"]',
    screenDropdownOption: '//li[@role="option"]//span[text()="screenName"]',
    viewScreenForInputDropdown:"//label[normalize-space(text())='View Screen']//following-sibling::div/div",
    viewScreenInputTxtBx: '[name="read_screen_id"]',
    editScreenForInputDropdown:"//label[normalize-space(text())='Edit Screen']//following-sibling::div/div",
    editScreenInputTxtBx: '[name="update_screen_id"]',
    collectionsaveBtn:"//button[text()='Save']",
    newRecordBtn:'[id="addUserCollection"]',
    dateinputTxtBx:'(//*[@type="text"])[1]',
    titleInputTxtBx:'[name="title"]',
    authorInputTxtBx:'[name="author"]',
    priceInputTxtBx:'[name="price"]',
    submitBtn:'[class="btn btn-primary"]',
    navEditBtn:'[id="nav-edit-record-tab"]',
    //collectionNameInput:'//a[text()[normalize-space()="name"]]',

    //users
    newUserBtn: '.d-flex > .btn',
    usernameInputTxtBox: '[id="username"]',
    firstNameInputTxtBox: '[id="firstname"]',
    lastNameInputTxtBox: '[id="lastname"]',
    jobTitleInputTxtBox: '[id="title"]',
    statusDropdown: '[id="status"]',
    emailInputTxtBox: '[id="email"]',
    passwordInputTxtBox: '[id="password"]',
    confirmPasswordInputTxtBox: '[id="confpassword"]',
    saveUserBtn: '[id="saveUser"]',
    profileUserLabel: '//h5[text()="Profile"]',
    searchUserField: "(//input[@id='search-box'])[1]",
    searchButton: "(//button[@aria-label='Search'])[1]",
    editUserButton: '[item-index="0"] > :nth-child(9) > .actions > .popout > [title="Edit"] > .fas',
    selectListLanguage: "//select[@id='language']",
    tabPermissions: "div[id='nav-tab'] > a[id='nav-profile-tab']",
    tabInformation: "div[id='nav-tab'] > a[id='nav-home-tab']",
    switchChangePassword: "(//input[@id='switch_force_change_password'])[1]",

    //DeleteUser
    tableUsers:'div > table',
    deleteTitleModal: 'h5[class="modal-title"]',
    cancelDeleteUserBtn: 'btn m-0 btn-outline-secondary',
    confirmDeleteUserBtn: '[class="btn m-0 btn-secondary"]',
    redAlertMessage:'div[class="alert-wrapper"] > div',

    //groups
    newGroupBtn: '.d-flex > .btn',
    nameGroupInputTxtBox: '[id="name"]',
    descriptionGroupTextareaBox: '[id="description"]',
    saveGroupBtn: '//button[text()[normalize-space()="Save"]]',
    groupDetailsTab: '[id = "nav-home-tab"]',
    userTab: '//a[text()="Users"]',
    newUserToGroupBtn: '#nav-users > #search-bar > :nth-child(1) > .d-flex > .btn',
    usersInputTxtBox: 'input[id = "users"]',
    saveUserToGroupBtn: '#addUser___BV_modal_footer_ > .btn-secondary',

    groupTab: '//a[text()="Group Permissions"]',
    permissionProcessTab: '//div[text()="Processes"]',
        createProcessPermissionLabel: '//label[text()="Create Processes"]',
        editProcessPermissionLabel: '//label[text()="Edit Processes"]',
        viewProcessPermissionLabel: '//label[text()="View Processes"]',
    savePermissionGroupBtn: '[id = "savePermissions"]',


    configBtn:'//a[@class="btn btn-outline-secondary"]//i[1]',
    createSignalBtn:'[for="signal_create"]',
    updateSignalBtn:'[for="signal_update"]',
    deleteSignalBtn:'[for="signal_delete"]',
    collectionSaveBtnSignl:"(//button[text()='Save'])[1]",
    studentDateInputTxtBx:'(//*[@type="text"])[1]',
    CIInputTxt:'[name="CI"]',
    studentNameInputTxtBx:'[name="name"]',
    lastNameInputTxtBx:'[name="lastName"]',
    selectlistBtn:'[class="multiselect__tags"]',
    selectOption:"(//li[@class='multiselect__element']//span)[1]",
    phoneNumberInputTxtBx:'[data-cy="screen-field-telephone"]',
    userInputTxtBx:'(//*[@placeholder="Search"])[1]',
    userTxt:'//td//span[text()[normalize-space()="userName"]]',
    userIdInput:'(//td//span[text()[normalize-space()="userName"]]//parent::td//preceding-sibling::td)[1]',

    //Sidebar
    expandSidebarMenu:'.nav-item.filter-bar.justify-content-between.py-2.sidebar-expansion',
    optionInSidebar:'.nav-item.filter-bar.justify-content-between',
    //Permission Users
    permissionTabUser:'#nav-profile-tab',
    makeSuperAdmin:'//*[@id="accordionPermissions"]/div[1]',
    saveButton:'#savePermissions',
    editctrl: "[title='Edit'] > .fas",
    loadingSpinnerCollection: "#collectionIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid",
    collectionTable: '//div[@id="collectionIndex"]/div[2]/div/div/table/tbody/tr',
    importCollectionBtn: "[id='import_collection']",
    browseBtn: "[id='pre-import']>button",
    inputToFileUpload: "[type='file']",
    importBtn: "button.btn.btn-secondary.ml-2",
    loadingCollectionSpinner: "[class='fas fa-circle-notch fa-spin']",
    //EditGroup
    groupDetailsTableContent: "#nav-home",
    labelHomePage: ' //label[text()="Home Page"]',
    labelDashboard: ' //label[text()="Dashboard"]',
    labelMenu: '//label[text()="Top Menu"]',
    homePageInputInGroup: '[class="multiselect__tags"]',
    divContainerOptionHomePage:
        '//label[text()="Home Page"]/parent::div//div//div[@class="multiselect__tags"]',
    divContainerOptionDashboard:
        '//label[text()="Dashboard"]/parent::div//div//div[@class="multiselect__tags"]',
    divContainerOptionTopMenu:
        '//label[text()="Top Menu"]/parent::div//div//div[@class="multiselect__tags"]',
    inputOptionHomePage:
        '//label[text()="Home Page"]/parent::div//div//div[@class="multiselect__tags"]//input',
    inputOptionDashboard:
        '//label[text()="Dashboard"]/parent::div//input',
    inputOptionTopMenu:
        '//label[text()="Top Menu"]/parent::div//input',
    listOptionHomePage:
        '//ul[@id="listbox-1"]//li//span[text()="My Dashboard"]',
    listOptionDashboard:
        '//ul[@id="listbox-3"]//li//span[text()="dashboardName"]',
    listOptionTopMenu:
        '//ul[@id="listbox-2" ]//li//span//span[text()="menuName"]',
    formGroupInput: '[class="form-group"]',
    saveGroupDetailsBtn: '[id="saveGroup"]',
    //Delete Dashboards and Menus
    rowInDashboardTable:
        '//*[@id="editCss"]/div/div/div/div/div/div[2]/div/table/tbody/tr',
    rowInMenuTable:
        '//*[@id="editCss"]/div/div/div/div/div/div[2]/div/div/table/tbody/tr',
    columnInTable: '[class="vuetable-slot"]',
    deleteBtnInTable: '[class="fas fa-trash-alt fa-lg fa-fw"]',
    confirmDeleteBtn: '[class="btn m-0 btn-secondary"]',

    //Collection
    configCollectionBtn: "//span[text()[normalize-space()='collectionName']]//ancestor::tr//a[@title='Configure']",
    deleteCollectionBtn: "//span[text()[normalize-space()='collectionName']]//ancestor::tr//button[@title='Delete']",
    collectionColumnsTab:"//a[text()='Columns']",
    collection_configButton:"[title='Configure Collection']",
    activeColumns_coulumnLinkDelete: "//span[text()='nameColumn']/parent::div/following-sibling::div/a",
    activeColumns_resetToDefaultBtn: "//text()[contains(.,'Reset to Default')]/ancestor::button[1]",
    activeColumns_addCustomColumnLink: "//div[contains(text(),'Add Custom Column')]/parent::a",
    customColumn_label: "//legend[text()='Label']/parent::fieldset//input",
    customColumn_field: "//legend[text()='Field']/parent::fieldset//input",
    customColumn_save: "//footer//button[contains(text(),'Save')]",
    searchCollection: "//input[@placeholder='Search']",

    //group
    clickonGroupBtn: "(//i[contains(@class,'fas nav-icon')])[2]",
    GroupPagevisible: "//li[text()[normalize-space()='Groups']]",
    clickonplsGroup: "//button[text()[normalize-space()='Group']]",
    groupNameBtn: "//input[@class='form-control form-control']",
    descriptionBtn: "//label[text()='Description']/following::textarea",
    groupsaveBtn:"//button[text()='Save']",
    CrtGrpPageVsb: "(//a[@data-toggle='tab'])[1]",
    clickonUserBtn: "//a[@href='#nav-users']",
    userPageVsble: "//button[text()[normalize-space()='User']]",
    crtuserBtn: "//button[text()[normalize-space()='User']]",
    selectUserBtn: "//label[text()='Users']/following::input",
    userInputText:'//span[contains(text(),"testname1")]',
    clickonSaveBtn: "(//button[text()='Save'])[3]",
    clickonGroup: "(//a[@class='nav-item nav-link'])[1]",
    clickonsaveBtn2: "(//button[text()='Save'])[1]",
    groupSearchInpBx:"//input[@class='form-control']",
    searchBtn:"//button[@class='btn btn-primary']",
    verifyGroupName:"(//td[@class='vuetable-slot']/descendant::span)[1]",
    clickGroupEditBt:"(//i[@class='fas fa-pen-square fa-lg fa-fw'])[1]",
    
    //File Manager
    addPublicFileBtn: '[aria-label="Upload Public File"]',
    selectFileBtn: '[data-cy="file-upload-button"]',
    doneBtn: '[class="btn btn-primary"]',

    //CRUD Notification:
    createNotificationsPermission: '[for="permission_create-notifications"]',
    deleteNotificationPermission: '[for="permission_delete-notifications"]',
    editNotificationPermission: '[for="permission_edit-notifications"]',
    viewNotificationPermission: '[for="permission_view-notifications"]',
    //CRUD Comments:
    createCommentsPermission: '[for="permission_create-comments"]',
    deleteCommentsPermission: '[for="permission_delete-comments"]',
    editCommentsPermission: '[for="permission_edit-comments"]',
    viewCommentsPermission: '[for="permission_view-comments"]',

}