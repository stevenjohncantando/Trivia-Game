$(document).ready(function () {
    var game = {
        questions: [
            {
                question: 'Who holds the record for the most goals in an NHL season?',
                possibles: ['Alexander Ovechkin', 'Wayne Gretzky', 'Mark Messier', 'Jaromir Jagr'],
                id: 'question-one',
                answer: 1
            }, {
                question: 'Who holds the records for most NHL wins as a coach?',
                possibles: ['Joel Quenneville', 'Scotty Bowman', 'Ken Hitchcock'],
                id: 'question-two',
                answer: 0
            }, {
                question: 'Who is the winningest goaltender in the history of the NHL?',
                possibles: ['Patrick Roy', 'Domink Hasek', 'Martin Brodeur', 'Ed Belfour'],
                id: 'question-three',
                answer: 3
            }, {
                question: 'Which team franchise holds the record for most Stanley Cups?',
                possibles: ['Philadelphia Flyers', 'Montreal Canadiens', 'Tampa Bay Lightning', 'Vancouver Canucks'],
                id: 'question-four',
                answer: 1
            },
        ]
    }

    var number = 20;
    $('#timeLeft').on('click', run);
    
    function decrement() {
        number--;
        $('#timeLeft').html('<h2>' + number + " seconds" + '</h2>');
        if (number === 0) {
            stop();
            checkAnswers();
        }
    }

    function run() {
        counter = setInterval(decrement, 1000);
    }

    function stop() {
        clearInterval(counter);
        alert("game over, man!")
    }
    run();

    function formTemplate(data) {
        var qString = "<form id='questionOne'>" + data.question + "<br>";
        var possibles = data.possibles;

        for (var i = 0; i < possibles.length; i++) {
            var possible = possibles[i];
            console.log(possible);
            qString = qString + "<input type='radio' name= " + data.id + "' value=" + i + ">" + possible;

        }
        return qString + "</form>";
    }
    window.formTemplate = formTemplate;

    function buildQuestions() {
        
        var questionHTML = ''
        for (var i = 0; i < game.questions.length; i++) {
            questionHTML = questionHTML + formTemplate(game.questions[i]) + "<br>";
        }
        $('#questions').append(questionHTML);

    }

    function isCorrect(question){
        var answers = $('[name='+question.id+']');
        var correct = answers.eq(question.answer);
        var isChecked = correct.is(':checked');
        return isChecked;
    }

    buildQuestions();

    function resultsTemplate(question) {
        var htmlBlock = '<div>'
        htmlBlock = htmlBlock + question + ': ' + isChecked;
        return htmlBlock + "</div>";
    }

    function checkAnswers (){
        var resultsHTML = '';
        var guessedAnswers = [];
        var correct = 0;
        var incorrect = 0;
        var unAnswered = 0; 
    
        for (var i = 0; i<game.questions.length; i++) {
            if (isCorrect(game.questions[i])) {
                correct++;
            } else {
                if (checkAnswered(game.questions[i])) {
                    incorrect++;
                } else {
                    unAnswered++;
                }
            }
    
        }
        $('.results').html('correct: '+correct+ "<br>" +'incorrect: '+incorrect+ "<br>" +'unanswered: '+unAnswered);
    }
    
    function checkAnswered(question){
        var answered = false;
        var answers = $('[name='+question.id+']');
    
        for (var i = 0; i < answers.length; i++) {
            if (answers[i].checked) {
                answered = true;
            }
        }
        return answered;
    }
    
        $('#done').on('click', function() {
        checkAnswers();
        stop();
	})
});
