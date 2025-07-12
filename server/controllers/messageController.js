import Message from "../models/message.js";
import User from "../models/User.js";


// Get all users except the logged in user
export const getUserForSidebar = async (req, res)=>{
    try {
        const userId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: userId}}).select("-password");

        // Count number of messages not seen
        const unseenMessage = {}
        const promises = filteredUsers.map(async (user)=> {
            const messages = await Message.find({senderId: user._id, receiverId: userId, seen: false})
            if(messages.length > 0){
                unseenMessage[user._id] = messages.length;
            }
        })
        await Promise.all(promises);
        res.json({success: true, users: filteredUsers, unseenMessage})
    } catch (error) {
        console.log(error.messages);
        res.json({success: false, message: error.messages})
    }
}