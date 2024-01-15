let analyticsContentBlock = document.querySelector("#analytics-content-block");

analyticsContentBlock.addEventListener("click" ,() =>{
    if (analyticsContentBlock.classList.contains("active") || analyticsContentBlock.classList.contains("forbidden")) return;
    openContentBlock(analyticsContentBlock);
    refreshAnalytics();
});

function refreshAnalytics(){

    if (isLoadedChecker === 1){
        isLoadedChecker = 2;
    }
    if (isLoadedChecker === 0 ){
        isLoadedChecker = 1;
        createLoader(analyticsContentBlock);
    }

    fetch('https://alfa-amo.ru/testwidget/load_analytics.php?branch_id=' + filialSelector.option + "&user_id=" + user_id  + "&customer_id=" + studentSelector.option, {
            method: 'GET'
    })
    .then(response => response.json()) 
    .then(data => {
        if (isLoadedChecker === 1){
            removeLoader(analyticsContentBlock);
            toggleConnectionMarks("true", data['alfa']);
            createConnectionTips();
            
            document.getElementById("analytics_money_balance").getElementsByClassName("analytics_value")[0].innerText = data['analytics']['money_balance'];
            document.getElementById("analytics_lessons_balance").getElementsByClassName("analytics_value")[0].innerText = data['analytics']['lesson_balance'];
            document.getElementById("analytics_purchases_amount").getElementsByClassName("analytics_value")[0].innerText = data['analytics']['total_purchases'];
            document.getElementById("analytics_total_purchases_sum").getElementsByClassName("analytics_value")[0].innerText = data['analytics']['total_purchase_amount'];
            document.getElementById("analytics_avg_purchase_sum").getElementsByClassName("analytics_value")[0].innerText = data['analytics']['average_purchase'];

            isLoadedChecker = 0;
        }
        else{
            isLoadedChecker = 1;
        }
        
    })
    .catch(error => {
        console.error('Error:', error);
        removeLoader(analyticsContentBlock);
        toggleOperationResult(false, LESSON_ADD_STUDENT_RES_ADD_TXT_FAILURE, addStudentToLessonContentBlock);
    });
}