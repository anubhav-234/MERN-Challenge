const { isEmpty } = require("lodash");
const Books = require("../../models/book")
const Members = require("../../models/member")
const Circulations = require("../../models/circulation")

exports.getAllBooks = async (req, res) => {
    try {
        const allBooks = await Books.find();
        res.json({ books: allBooks });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "No Books Found", books: [] })
    }
}

exports.performBookCheckout = async (req, res) => {
    try {
        const { BookID = "", MemberID = "" } = req.body;
        const availableBooks = await Books.find({ BookID });
        const availableMembers = await Members.find({ MemberID });
        if (isEmpty(availableBooks)) {
            throw new Error("Book Not Found in Library")
        }
        if (isEmpty(availableMembers)) {
            throw new Error("Member Not Found")
        }
        const { BookName = "", NumberOfCopies = 0 } = availableBooks[0];
        const { MemberName = "" } = availableMembers[0];
        if (NumberOfCopies == 0) {
            throw new Error("Book Not Available")
        }
        const updatedCountOfBooks = NumberOfCopies - 1;
        await Books.updateOne({ BookID }, {
            $set: {
                "NumberOfCopies": updatedCountOfBooks
            }
        });
        const newCirculation = new Circulations({ MemberID, BookID, issueDate: new Date().toString(), fine: 0 });
        await newCirculation.save();
        res.json({message: `${BookName} issued to ${MemberName}`})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
}

exports.performBookReturn = async (req, res) => {
    try {
        const { BookID = "", MemberID = "" } = req.body;
        const availableBooks = await Books.find({ BookID });
        const availableMembers = await Members.find({ MemberID });
        if (isEmpty(availableBooks)) {
            throw new Error("Book Not Found in Library")
        }
        if (isEmpty(availableMembers)) {
            throw new Error("Member Not Found")
        }
        const { BookName = "", NumberOfCopies = 0 } = availableBooks[0];
        const { MemberName = "" } = availableMembers[0];
        const updatedCountOfBooks = NumberOfCopies + 1;
        await Books.updateOne({ BookID }, {
            $set: {
                "NumberOfCopies": updatedCountOfBooks
            }
        });
        const circulations = await Circulations.find({ MemberID, BookID });
        const fineImposed = Math.max(0, new Date().getDate() - new Date(circulations[0].issueDate).getDate() - 7) * 50;
        await Circulations.deleteOne({ MemberID, BookID });
        res.json({message: `${BookName} recieved from ${MemberName} with fine imposed of ${fineImposed}`})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}

exports.getMembersData = async (req, res) => {
    try {
        const { MemberID = "" } = req.body || {};
        let allCirculations = await Circulations.find({ MemberID });
        let totalFine = 0;
        const currentDate = new Date();
        let overdueBooks = [];
        allCirculations.forEach((element) => {
            overdueBooks.push(element.BookID);
            totalFine += Math.max(0, currentDate.getDate() - new Date(element.issueDate).getDate() - 7) * 50;
        });
        res.json({ overdueBooks, totalFine });   
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
}