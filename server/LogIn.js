class LogIn {
  constructor() {
    this.user = null;
    this.passwordEncryptor = new PasswordEncryptor();
  }

  async logIn(req, res) {
    const { studentId, password } = req.body;

    if (!studentId || !password) {
      return res
        .status(400)
        .json({ error: "Student ID and password are required for login" });
    }

    const student = this.students.find((s) => s.studentId === studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const passwordMatch = await this.passwordEncryptor.comparePasswords(
        password,
        student.password
    );

    if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password" });
    }

    this.user = student;

    res.status(200).json({ message: "Logged in successfully" });
  }
}