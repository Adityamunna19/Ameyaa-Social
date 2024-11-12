import { User } from '../types/auth';

const CSV_FILE_KEY = 'ameyaa_social_users';
const CSV_HEADERS = ['id', 'email', 'name', 'password', 'role'];
const ADMIN_EMAIL = 'admin';
const ADMIN_PASSWORD = 'admin';

interface CsvUser extends User {
  password: string;
}

export const csvAuth = {
  initializeAdmin: () => {
    const users = csvAuth.getAllUsers();
    const adminExists = users.some(user => user.email === ADMIN_EMAIL);
    
    if (!adminExists) {
      csvAuth.addUser({
        id: 'admin',
        email: ADMIN_EMAIL,
        name: 'Administrator',
        password: ADMIN_PASSWORD,
        role: 'admin'
      });
    }
  },

  parseCsv: (csv: string): CsvUser[] => {
    const lines = csv.trim().split('\n');
    if (lines.length <= 1) return [];

    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj: any, header, index) => {
        obj[header] = values[index];
        return obj;
      }, {});
    });
  },

  generateCsv: (users: CsvUser[]): string => {
    const rows = [
      CSV_HEADERS.join(','),
      ...users.map(user => 
        CSV_HEADERS.map(header => user[header as keyof CsvUser]).join(',')
      )
    ];
    return rows.join('\n');
  },

  getAllUsers: (): CsvUser[] => {
    const storedData = localStorage.getItem(CSV_FILE_KEY);
    if (!storedData) return [];
    return csvAuth.parseCsv(storedData);
  },

  saveUsers: (users: CsvUser[]): void => {
    const csv = csvAuth.generateCsv(users);
    localStorage.setItem(CSV_FILE_KEY, csv);
  },

  findUser: (email: string): CsvUser | undefined => {
    const users = csvAuth.getAllUsers();
    return users.find(user => user.email === email);
  },

  addUser: (user: CsvUser): void => {
    const users = csvAuth.getAllUsers();
    users.push(user);
    csvAuth.saveUsers(users);
  },

  validateCredentials: (email: string, password: string): User | null => {
    const user = csvAuth.findUser(email);
    if (user && user.password === password) {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  },

  downloadCsv: () => {
    const users = csvAuth.getAllUsers();
    const csv = csvAuth.generateCsv(users);
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'users.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
};