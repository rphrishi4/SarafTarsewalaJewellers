export const convertUnixToDateTime = async(unixTimestamp) => {
    // Create a new Date object using the Unix timestamp (in milliseconds)
    const date = new Date(unixTimestamp * 1000);

    // Define options for formatting the date and time
    const options = {
        weekday: 'long', // 'long' for full name (e.g., Monday), 'short' for abbreviated (e.g., Mon)
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short' // 'short' for abbreviated (e.g., GMT)
    };

    // Format the date and time using the options
    const formattedDateTime = date.toLocaleString('en-US', options);

    return formattedDateTime;
};

// // Example usage
// const unixTimestamp = 1620719140; // Example Unix timestamp
// const dateTime = convertUnixToDateTime(unixTimestamp);
// console.log(dateTime); // Output: Wednesday, May 12, 2021, 3:52:20 PM GMT
