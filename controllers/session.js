const Session = require("../models/session");

// get available sessions
async function getAvailableSessions(req, res) {
  try{
    const sessions = await Session.find({ student: null });
    return res.status(200).json(sessions);
  }catch(err){
    return res.status(500).json({ message: `Internal server error - ${err}` });
  }
}

// book a session with the dean
async function bookSession(req, res) {
  try{
    const {sessionId} = req.body;
    const studentId = req.userId;
    const session = await Session.findById(sessionId);
    if (!session) {
      throw new Error("Session not found");
    }
    
    if (session.student) {
        throw new Error("Session already booked");
    }

    session.student = studentId;
    const newSession = await session.save()
    return res.status(200).json(newSession);
  }catch(err){
    return res.status(500).json({ message: `Internal server error - ${err}` });
  }

}

// get pending sessions for the dean
async function getPendingSessions(req, res) {
  try{
    const deanId = req.userId;

    const sessions = await Session.find({ dean: deanId, student: { $ne: null } })

    return res.status(200).json(sessions);
  }catch(err){
    return res.status(500).json({ message: `Internal server error - ${err}` });
  }
}

module.exports = { getAvailableSessions, bookSession, getPendingSessions }