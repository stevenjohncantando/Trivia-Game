function checkAnswers (){
        var resultsHTML = '';
        var guessedAnswers = [];
        var correct = 0;
        var incorrect = 0;
        var unAnswered =0
    
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
        var anyAnswered = false;
        var answers = $('[name='+question.id+']');
    
        for (var i = 0; i < answers.length; i++) {
            if (answers[i].checked) {
                anyAnswered = true;
            }
        }
   
        return anyAnswered;
    }
    
        $('#doneButton').on('click', function() {
        checkAnswers();
        stop();
        $("#messageDiv").html("Game Over!");
        });