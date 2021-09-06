interface user {
  id: string,
  username: string,
  name: string,
  avatarURL: string,
  answers: {[key: string]: answer},
  questions: string[],
}

interface authedUser {
  username: string,
  name: string,
  token: string,
}

interface question {
  id: string,
  author: string,
  timestamp: number,
  optionOne: {
    votes: string[],
    text: string,
  },
  optionTwo: {
    votes: string[],
    text: string,
  }
}

type answer = "optionOne" | "optionTwo"

interface userRegisterRequest { username: string, name: string, password: string, avatarURL?: string, }

interface userLoginRequest { username: string, password: string }