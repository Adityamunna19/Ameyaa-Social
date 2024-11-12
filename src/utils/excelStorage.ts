import * as XLSX from 'xlsx';

interface ExcelData {
  users: any[];
  bookings: any[];
}

const STORAGE_KEY = 'ameyaa_social_data';

export const excelStorage = {
  loadData: (): ExcelData => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData);
    }
    return { users: [], bookings: [] };
  },

  saveData: (data: ExcelData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  exportToExcel: () => {
    const data = excelStorage.loadData();
    
    // Create workbook and worksheets
    const wb = XLSX.utils.book_new();
    
    // Users worksheet
    const usersWS = XLSX.utils.json_to_sheet(data.users);
    XLSX.utils.book_append_sheet(wb, usersWS, 'Users');
    
    // Bookings worksheet
    const bookingsWS = XLSX.utils.json_to_sheet(data.bookings);
    XLSX.utils.book_append_sheet(wb, bookingsWS, 'Bookings');
    
    // Save the file
    XLSX.writeFile(wb, 'ameyaa_social_data.xlsx');
  },
};

// Initialize storage with empty data if not exists
if (!localStorage.getItem(STORAGE_KEY)) {
  excelStorage.saveData({ users: [], bookings: [] });
}