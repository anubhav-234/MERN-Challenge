exports.getData = (req, res) => {
    const data = {
        message: '22222222',
        timestamp: new Date().toISOString()
    };
    res.json(data);
};

exports.postData = (req, res) => {
    const receivedData = req.body;
    // Do something with the received data
    res.json({ message: 'You clicked 2', data: receivedData });
};
