;(((global, $) => {
    // 'new' an object
    class Greetr {
        constructor(firstName, lastName, language) {
            return new Greetr.init(firstName, lastName, language);   
        }

        // prototype holds methods (to save memory space)
        // 'this' refers to the calling object at execution time
        fullName() {
            return `${this.firstName} ${this.lastName}`;   
        }

        validate() {
            // check that is a valid language
            // references the externally inaccessible 'supportedLangs' within the closure
             if (!supportedLangs.includes(this.language)) {
                throw "Invalid language";   
             }
        }

        // retrieve messages from object by referring to properties using [] syntax
        greeting() {
            return `${greetings[this.language]} ${this.firstName}!`;
        }

        formalGreeting() {
            return `${formalGreetings[this.language]}, ${this.fullName()}`;  
        }

        // chainable methods return their own containing object
        greet(formal) {
            let msg;
            
            // if undefined or null it will be coerced to 'false'
            if (formal) {
                msg = this.formalGreeting();  
            }
            else {
                msg = this.greeting();  
            }

            if (console) {
                console.log(msg);
            }

            // 'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        }

        log() {
            if (console) {
                console.log(`${logMessages[this.language]}: ${this.fullName()}`); 
            }
            
            // make chainable
            return this;
        }

        setLang(lang) {
            
            // set the language
            this.language = lang;
        
            // validate
            this.validate();
            
            // make chainable
            return this;
        }

        HTMLGreeting(selector, formal) {
            if (!$) {
                throw 'jQuery not loaded';   
            }
            
            if (!selector) {
                throw 'Missing jQuery selector';   
            }
            
            // determine the message
            let msg;
            if (formal) {
                msg = this.formalGreeting();   
            }
            else {
                msg = this.greeting();   
            }
            
            // inject the message in the chosen place in the DOM
            $(selector).html(msg);
            
            // make chainable
            return this;
        }

        // the actual object is created here, allowing us to 'new' an object without calling 'new'
        static init(firstName, lastName, language) {
            
            const self = this;
            self.firstName = firstName || '';
            self.lastName = lastName || '';
            self.language = language || 'en';
            
            self.validate();
            
        }
    }

    // hidden within the scope of the IIFE and never directly accessible
    var supportedLangs = ['en', 'es'];

    // informal greetings
    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };

    // formal greetings
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };

    // logger messages
    var logMessages = {
        en: 'Logged in',
        es: 'Inició sesión'
    };

    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    Greetr.init.prototype = Greetr.prototype;

    // attach our Greetr to the global object, and provide a shorthand '$G' for ease our poor fingers
    global.Greetr = global.G$ = Greetr;
})(window, jQuery));























// gets a new object (the architecture allows us to not have to use the 'new' keyword here)
const g = G$('John', 'Doe');

// use our chainable methods
g.greet().setLang('es').greet(true).log();

// let's use our object on the click of the login button
$('#login').click(() => {
   
    // create a new 'Greetr' object (let's pretend we know the name from the login)
    const loginGrtr = G$('John', 'Doe');
    
     // hide the login on the screen
    $('#logindiv').hide();
    
     // fire off an HTML greeting, passing the '#greeting' as the selector and the chosen language, and log the welcome as well
    loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
    
});



/*
  <div id="logindiv">
    <select id="lang">
                <option value="en">English</option>
                <option value="es">Spanish</option>
            </select>
    <input type="button" value="Login" id="login" />
  </div>
  <h1 id='greeting'></h1>
  <script src="jquery-1.11.2.js"></script>
  
*/
