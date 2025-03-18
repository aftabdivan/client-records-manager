# Client Records Management Application

A React application that allows users to manage client records by uploading JSON files, searching, editing, and deleting records.

## Features

- Upload JSON files with client records
- Automatic handling of duplicate email addresses
- Merge data from multiple JSON file uploads
- Paginated display of all records
- Search functionality by ID, Name, or Email
- Edit and delete records
- Email uniqueness validation
- Responsive design

## Technologies Used

- Next.js 14 (React framework)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- localStorage for data persistence

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:

\```bash
git clone https://github.com/aftabdivan/client-records-manager.git
cd client-records-manager
\```

2. Install dependencies:

\```bash
npm install
# or
yarn install
\```

3. Run the development server:

\```bash
npm run dev
# or
yarn dev
\```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

### Uploading JSON Files

1. Click the "Upload JSON" button
2. Select a JSON file with client records
3. The file will be processed and records will be displayed

The JSON file should have the following structure:

\```json
[
  {
    "id": 1,
    "name": "Joe Doe",
    "email": "joe1@gmail.com"
  },
  {
    "id": 2,
    "name": "Joe Lin",
    "email": "joe2@gmail.com"
  }
]
\```

### Managing Records

- **Search**: Type in the search bar to filter records by ID, Name, or Email
- **Edit**: Click the edit icon to modify a record
- **Delete**: Click the delete icon to remove a record

## Building for Production

To build the application for production:

\```bash
npm run build
# or
yarn build
\```

Then, you can start the production server:


npm start
# or
yarn start
\```

## License

This project is licensed under the MIT License.


\```bash![Client Record Manager 3](https://github.com/user-attachments/assets/e8173a74-8a2f-4ea6-aa70-772bf869e653)
![Client Record Manager 2](https://github.com/user-attachments/assets/3ff3e1d6-130c-4365-84e7-f925e8c0eca7)
![Client Record Manager 1](https://github.com/user-attachments/assets/dff86d09-b62f-4e96-a9f5-00cc282ddab1)
