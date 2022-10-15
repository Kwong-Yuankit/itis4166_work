const { DateTime } = require("luxon");
const {v4: uuidv4} = require('uuid');

const connections= [
    {
        id: '1',
        type: 'study',
        title: 'Morning Study Group',
        details: 'Meet with other students on Thursday, September 22 to find other students in your class to study with.',
        host: 'Kwongsong Group',
        date: '2022-10-27',
        time: '18:00',
        endtime: '19:30',
        time_format: DateTime.local(2022,10,27,18,00).toLocaleString(DateTime.TIME_SIMPLE),
        endtime_format: DateTime.local(2022,10,27,19,30).toLocaleString(DateTime.TIME_SIMPLE),
        location: 'Library Floor 1',
        imgURL: '/images/pexels-pixabay-416405.jpg'
    },
    {
        id: '2',
        type: 'study',
        title: 'Exam Preparation',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
        host: 'Kwongsong Group',
        date: '2022-10-17',
        time: '18:00',
        endtime: '19:00',
        time_format: DateTime.local(2022,10,17,18,00).toLocaleString(DateTime.TIME_SIMPLE),
        endtime_format: DateTime.local(2022,10,17,19,00).toLocaleString(DateTime.TIME_SIMPLE),
        location: 'Library Floor 2',
        imgURL: '/images/pexels-pixabay-416405.jpg'
    },
    {
        id: '3',
        type: 'study',
        title: 'Intermediate Python Lecture',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        host: 'Kwongsong Group',
        date: '2022-10-02',
        time: '15:00',
        endtime: '17:00',
        time_format: DateTime.local(2022,10,02,15,00).toLocaleString(DateTime.TIME_SIMPLE),
        endtime_format: DateTime.local(2022,10,02,17,00).toLocaleString(DateTime.TIME_SIMPLE),
        location: 'Library Floor 3',
        imgURL: '/images/pexels-pixabay-416405.jpg'
    },
    {
        id: '4',
        type: 'social',
        title: 'Biking Event',
        details: 'Bike around campus together',
        host: 'Kwongsong Group',
        date: '2022-10-11',
        time: '15:00',
        endtime: '16:30',
        time_format: DateTime.local(2022,10,11,15,00).toLocaleString(DateTime.TIME_SIMPLE),
        endtime_format: DateTime.local(2022,10,11,16,30).toLocaleString(DateTime.TIME_SIMPLE),
        location: 'Parking Lot 3',
        imgURL: '/images/pexels-pixabay-416405.jpg'
    },
    {
        id: '5',
        type: 'social',
        title: 'Movie Night',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
        host: 'Kwongsong Group',
        date: '2022-10-10',
        time: '14:00',
        endtime: '15:00',
        time_format: DateTime.local(2022,10,10,14,00).toLocaleString(DateTime.TIME_SIMPLE),
        endtime_format: DateTime.local(2022,10,10,15,00).toLocaleString(DateTime.TIME_SIMPLE),
        location: 'Student Union Theatre',
        imgURL: '/images/pexels-pixabay-416405.jpg'
    },
    {
        id: '6',
        type: 'social',
        title: 'Gaming Tournament',
        details: 'Compete against other players in our tournament. Win great prizes!',
        host: 'Kwongsong Group',
        date: '2022-10-14',
        time: '12:00',
        endtime: '15:00',
        time_format: DateTime.local(2022,10,14,12,00).toLocaleString(DateTime.TIME_SIMPLE),
        endtime_format: DateTime.local(2022,10,14,15,00).toLocaleString(DateTime.TIME_SIMPLE),
        location: 'Student Union Floor 2',
        imgURL: '/images/pexels-pixabay-416405.jpg'
    }
];


exports.find = function() {
    return connections;
};

exports.findById = id => connections.find(connection => connection.id === id);

//add connection to array
exports.save = function(connection) {
    connection.id = uuidv4();
    //format time
    connection.time_format = DateTime.fromISO(connection.time).toLocaleString(DateTime.TIME_SIMPLE);
    connection.endtime_format = DateTime.fromISO(connection.endtime).toLocaleString(DateTime.TIME_SIMPLE);
    if(!connection.imgURL) {
        connection.imgURL = '/images/pexels-pixabay-416405.jpg';
    }
    connection.type = connection.type.toLowerCase();
    connections.push(connection);
}

//update connection in array
exports.updateById = function(id, newConnection) {
    let connection = connections.find(connection => connection.id === id);
    if (connection) {
        connection.title = newConnection.title;
        connection.type = newConnection.type.toLowerCase();
        connection.details = newConnection.details;
        connection.host = newConnection.host;
        connection.date = newConnection.date;
        connection.location = newConnection.location;
        connection.time = newConnection.time;
        connection.endtime = newConnection.endtime;
        connection.time_format = DateTime.fromISO(newConnection.time).toLocaleString(DateTime.TIME_SIMPLE);
        connection.endtime_format = DateTime.fromISO(newConnection.endtime).toLocaleString(DateTime.TIME_SIMPLE);
        connection.imgURL = newConnection.imgURL;
        return true;
    } else {
        return false;
    }
}

//delete connection from array
exports.deleteById = function(id) {
    let index = connections.findIndex(connection => connection.id === id);
    if(index != -1) {
        connections.splice(index, 1);
        return true;
    } else {
        return false;
    }
}

// function to store all unique connection types
exports.getConnectionTypes = function() {
    let types = [];
    connections.forEach(connection => {
        if(!types.includes(connection.type)) {
            types.push(connection.type);
        }
    });
    return types;
}