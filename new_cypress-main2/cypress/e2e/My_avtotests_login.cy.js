import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');  // Зашли на сайт
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');  // Проверяю цвет кнопки Восстановить пароль
          });

    afterEach('Конец теста', function () {
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');  // Есть крестик, и он виден для пользователя
           });

    
    it('Верный логин и верный пароль', function () {
         cy.get(main_page.email).type(data.login);  // Ввели верный логин
         cy.get(main_page.password).type(data.password);  // Ввели верный пароль
         cy.get(main_page.login_button).click();  // Нажала Войти

         cy.wait(2000);

         cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Проверяю, что после авторизации вижу текст
         cy.get('#messageHeader').should('be.visible');  // Текст виден пользователю
        
     })
 
     it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login);  // Ввели верный логин
        cy.get(main_page.password).type('iLoveqastudio19');  // Ввели неверный пароль
        cy.get(main_page.login_button).click();  // Нажала Войти

        cy.wait(2000);

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверяю, что после авторизации вижу текст
        cy.get('#messageHeader').should('be.visible');  // Текст виден пользователю
           
    })

    it('Проверка, что в логине есть @', function () {
        cy.get(main_page.email).type('germandolnikov.ru');  // Ввели логин без @
        cy.get(main_page.password).type(data.password);  // Ввели верный пароль
        cy.get(main_page.login_button).click();  // Нажала Войти

        cy.wait(2000);

        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // Проверяю, что после авторизации вижу текст
        cy.get('#messageHeader').should('be.visible');  // Текст виден пользователю
           
    })


    it('Проверка восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click();  // Нажала кнопку Восстановить пароль
        cy.get('#mailForgot').type('german@dolnikov.ru');  // Ввела почту для восстановления пароля
        cy.get('#restoreEmailButton').click();  // Нажала кнопку Отправить код

        cy.wait(2000);

        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // Проверяю на совпадение текст
           
    })

    it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type('german@dolniko.ru');  // Ввели неверный логин
        cy.get(main_page.password).type(data.password);  // Ввели верный пароль
        cy.get(main_page.login_button).click();  // Нажала Войти

        cy.wait(2000);

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверяю на совпадение текст
        cy.get('#messageHeader').should('be.visible');  // Текст виден пользователю
           
    })

    it('Проверка на приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru');  // Ввели верный логин, но с заглавными буквами
        cy.get(main_page.password).type(data.password);  // Ввели верный пароль
        cy.get(main_page.login_button).click();  // Нажала Войти

        cy.wait(2000);

        cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Проверяю на совпадение текст
        cy.get('#messageHeader').should('be.visible');  // Текст виден пользователю
       
    })

 })
 
 
 // запуск через теринал: npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome
 