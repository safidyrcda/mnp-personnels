export interface StaffData {
  name: string
  forename: string
  jobTitle: string
  department: string
  idNumber: string
  photo?: string
}

const staffDatabase: StaffData[] = [
  {
    name: "Nirina",
    forename: "Jean",
    jobTitle: "REGOI",
    department: "Département SYSTEME D'INFORMATION",
    idNumber: "10400",
    photo: "/test.jpg",
  },
  {
    name: "RASOAMALALA",
    forename: "Marie",
    jobTitle: "Responsable Communication",
    department: "Direction Générale",
    idNumber: "10401",
    photo: "/test.jpg",
  },
  {
    name: "ANDRIAMANANTSOA",
    forename: "Paul",
    jobTitle: "Biologiste",
    department: "Département Recherche",
    idNumber: "10402",
    photo: "/test.jpg",
  },
  {
    name: "RAZAFINDRAKOTO",
    forename: "Sophie",
    jobTitle: "Guide touristique",
    department: "Département Tourisme",
    idNumber: "10403",
    photo: "/test.jpg",
  },
  {
    name: "RANDRIANARISOA",
    forename: "Michel",
    jobTitle: "Chef de parc",
    department: "Parc National Andasibe",
    idNumber: "10404",
    photo: "/test.jpg",
  },
  {
    name: "RAHARISON",
    forename: "Nathalie",
    jobTitle: "Comptable",
    department: "Département Finances",
    idNumber: "10405",
    photo: "/test.jpg",
  },
]

export function getAllStaff(): StaffData[] {
  return staffDatabase
}

export function getStaffByMatricule(matricule: string): StaffData | undefined {
  return staffDatabase.find((staff) => staff.idNumber === matricule)
}


export async function getAllMatricules() {
  const staffList = await getAllStaff() // or however you load data
  return staffList.map((s) => s.idNumber)
}
