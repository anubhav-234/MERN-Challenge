// controllers/apiController.js

exports.getData = (req, res) => {
    const data = {
        message: 'You clicked on button 1',
        timestamp: new Date().toISOString()
    };
    res.status(200).json(data);
};

exports.postData = (req, res) => {
    const receivedData = req.body;
    // Do something with the received data
    res.json({ message: 'You clicked on button 1', data: receivedData });
};
