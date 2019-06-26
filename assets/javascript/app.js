// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAmG1youtzSrQ5xVNQmLMP4q6Ukx1NPXcg",
    authDomain: "train-schedule-f1420.firebaseapp.com",
    databaseURL: "https://train-schedule-f1420.firebaseio.com",
    projectId: "train-schedule-f1420",
    storageBucket: "",
    messagingSenderId: "1047957693951",
    appId: "1:1047957693951:web:0768817d36d15ba7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// Button for adding trains
$("#add-train-btn").on("click", function(event) {

    event.preventDefault();

    // Grab user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var firstTime = $("#first-time-input").val().trim();
    var freq = $("#frequency-input").val().trim();

    console.log("Train Name: " + trainName);
    console.log("Destination: " + trainDest);
    console.log("First Time: " + firstTime);
    console.log("Frequency: " + freq);

    // First time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm");

    console.log("First Time Converted: " + firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("HH:mm"));

    // Difference between first time and current time
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Difference in Time: " + diffTime);

    // Time since last train
    var timeRemainder = diffTime % freq;
    console.log(timeRemainder);

    // Minutes until next train
    var minutesTillTrain = freq - timeRemainder;
    console.log("Minutes till train: " + minutesTillTrain);

    // Next train arrival time
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    var nextTrainTime = moment(nextTrain).format("HH:mm")
    console.log("Next Train at: " + nextTrainTime);

    // Create local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: trainDest,
        first: firstTime,
        frequency: freq
    }

    console.log(newTrain);

    database.ref().push(newTrain);


    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
})