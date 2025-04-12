import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
    });

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible'); // есть крестик и он виден для пользователя
    });

    it('Верный логин и верный пароль', function () {
        //cy.visit('/'); //зашли на сайт
        //cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //проверяю цвет кнопки воостановить пароль

        cy.get(main_page.email).type(data.login); //ввели верный логин
        cy.get(main_page.password).type(data.password); //Ввели верный пароль
        cy.get(main_page.login_button).click(); //нажал войти

        //cy.wait(500);

        cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверяю, что после авторицации вижу тескт
        cy.get(result_page.title).should('be.visible'); //текст виден пользователю
        //cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден для пользователя

    })

    it('Верный логин и неверный пароль', function () {
        //cy.visit('/'); //зашли на сайт
        //cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //проверяю цвет кнопки воостановить пароль

        cy.get(main_page.email).type(data.login); //ввели верный логин
        cy.get(main_page.password).type('iLoveqastudio7'); //Ввели неверный пароль
        cy.get(main_page.login_button).click(); //нажал войти

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверяю, что после авторицации вижу тескт
        cy.get(result_page.title).should('be.visible'); //текст виден пользователю
        //cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден для пользователя

    })
    it('Неверный логин и верный пароль', function () {
        //cy.visit('/'); //зашли на сайт
        //cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //проверяю цвет кнопки воостановить пароль

        cy.get(main_page.email).type('german@d.ru'); //ввели неверный логин
        cy.get(main_page.password).type(data.password); //Ввели верный пароль
        cy.get(main_page.login_button).click(); //нажал войти

        //cy.wait(500);

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверяю, что после авторицации вижу тескт
        cy.get(result_page.title).should('be.visible'); //текст виден пользователю
        //cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден для пользователя

    })



    it('Проверка, что в логине есть @', function () {
        //cy.visit('/'); //зашли на сайт
        //cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //проверяю цвет кнопки воостановить пароль

        cy.get(main_page.email).type('germandolnikov.ru'); //ввел логин без @
        cy.get(main_page.password).type(data.password); //Ввели верный пароль
        cy.get(main_page.login_button).click(); //нажал войти

        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // проверяю, что после авторицации вижу тескт
        cy.get(result_page.title).should('be.visible'); //текст виден пользователю
        //cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден для пользователя

    })

    it('Проверка восстановления пароля', function () {
        //cy.visit('/'); //зашли на сайт
        //cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //проверяю цвет кнопки воостановить пароль


        cy.get(main_page.fogot_pass_btn).click(); //нажимаю кнопку забыли пароль
        cy.get(recovery_page.email).type(data.login); //ввел почту для восстановления пароля
        cy.get(recovery_page.send_button).click();

        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // проверяю, что после на совпадение тект
        cy.get(result_page.title).should('be.visible'); //текст виден пользователю
        //cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден для пользователя

    })

    it('Проверка на приведение к строчным буквам в логине', function () {
        //cy.visit('/'); //зашли на сайт
        //cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //проверяю цвет кнопки воостановить пароль

        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); //ввели верный логин со строчными буквами
        cy.get(main_page.password).type(data.password); //Ввели верный пароль
        cy.get(main_page.login_button).click(); //нажал войти

        //cy.wait(500);

        cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверяю, что после авторицации вижу тескт - тут ловим баг
        cy.get(result_page.title).should('be.visible'); //текст виден пользователю
        //cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден для пользователя

    })

})



