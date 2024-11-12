import * as XLSX from 'xlsx';
import { User } from '../types/auth';

const EXCEL_FILE_KEY = 'ameyaa_social_users';

interface ExcelUser extends User {
  password: string;
}

export const excelAuth = {
  getWorkbook: (): XLSX.WorkBook => {
    const storedData = localStorage.getItem(EXCEL_FILE_KEY);
    if (storedData) {
      return XLSX.read(storedData, { type: 'base64' });
    }
    
    // Create new workbook if none exists
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet([]), 'Users');
    return wb;
  },

  saveWorkbook: (wb: XLSX.WorkBook) => {
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });
    localStorage.setItem(EXCEL_FILE_KEY, excelBuffer);
  },

  getAllUsers: (): ExcelUser[] => {
    const wb = excelAuth.getWorkbook();
    const ws = wb.Sheets['Users'];
    return ws ? XLSX.utils.sheet_to_json(ws) : [];
  },

  findUser: (email: string): ExcelUser | undefined => {
    const users = excelAuth.getAllUsers();
    return users.find(user => user.email === email);
  },

  addUser: (user: ExcelUser): void => {
    const wb = excelAuth.getWorkbook();
    const users = excelAuth.getAllUsers();
    
    users.push(user);
    
    const ws = XLSX.utils.json_to_sheet(users);
    XLSX.utils.book_remove_sheet(wb, 0);
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    
    excelAuth.saveWorkbook(wb);
  },

  validateCredentials: (email: string, password: string): ExcelUser | null => {
    const user = excelAuth.findUser(email);
    if (user && user.password === password) {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  },

  downloadExcel: () => {
    const wb = excelAuth.getWorkbook();
    XLSX.writeFile(wb, 'users.xlsx');
  }
};