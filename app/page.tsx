import {
    Box,
    Avatar,
    Button,
    Checkbox,
    ClientOnly,
    HStack,
    Heading,
    Progress,
    RadioGroup,
    Skeleton,
    VStack,
  } from "@chakra-ui/react"

import { inscriptions, salleClasses, eleves, anneeScolaires, genders } from '@/db/schema'
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '@/db/schema';
import * as relations from '@/db/relations';
import { eq, and, desc, asc } from 'drizzle-orm';
import { Student } from "@/api/interfaces/Student";

const client = createClient({ 
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN
});

const studentId = process.env.STUDENT_IDENTIFICATION! as string;
const anneeScolaireId = process.env.ANNEE_SCOLAIRE_IDENTIFICATION! as string;

const db = drizzle(client, { schema: { ...schema, ...relations } });

  
  export default async function Page() {

    const listInscriptions : Student[] = await db.select({
      number : eleves.number,
      firstName : eleves.firstName,
      lastName : eleves.lastName,
      otherNames : eleves.otherNames,
      dateOfBirth : eleves.dateOfBirth,
      email : eleves.email,
      phone : eleves.phone,
      classroom : salleClasses,
  })
                                      .from(inscriptions)
                                      .leftJoin(salleClasses, eq(salleClasses.id, inscriptions.salleClasseId))
                                      .leftJoin(eleves, eq(eleves.id, inscriptions.eleveId))
                                      .leftJoin(anneeScolaires, eq(anneeScolaires.id, salleClasses.anneeScolaireId))
                                      .leftJoin(genders, eq(genders.code, eleves.genderCode))
                                      .where( and
                                              (
                                                  eq(salleClasses.anneeScolaireId, anneeScolaireId), 
                                                  eq(inscriptions.eleveId, studentId)
                                              )                 
                                          );
 const student : Student = (listInscriptions.length === 1 ) ? (listInscriptions[0]) : (null);
    return (

      <>
        <Box id="SudentInfoBox" w={"100%"}>
        <Avatar.Root>
          <Avatar.Fallback name="Damigu Djagbaré" />
          <Avatar.Image src="../studentsPics/Damigu.jfif" />
        </Avatar.Root>
        </Box>

        <Box id="StudentTimeTableBox">
          StudentTimeTableBox
        </Box>

        <Box id="SudentEvaluationsBox">
          SudentEvaluationsBox
        </Box>

        <Box id="SchoolEventsBox">
          SchoolEventsBox
        </Box>


      {/*<Box pos="absolute" top="4" right="4">
          <ClientOnly fallback={<Skeleton w="10" h="10" rounded="md" />}>
            <ColorModeToggle />
          </ClientOnly>
        </Box> */}
      </>
        
    )
  }