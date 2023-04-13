"use client";
import { ReactNode, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Forms } from '@/components/Form/Forms';
import { FormIntrutor, InstrutorFormData } from '@/components/Form/FormInstrutor';
import { Grid } from '@mui/material';
import { TableInstrutor } from '@/components/Table/TableInstrutor';
import { FormCurso } from '@/components/Form/FormCurso';
import { FormUsuario } from '@/components/Form/FormUsuario';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

function tabProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const [atualizaInstrutor, setAtualizaInstrutor] = useState(false);
  const [atualizaCurso, setAtualizaCurso] = useState(false);
  const [atualizaUsuario, setAtualizaUsuario] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ 
      marginTop: "1rem !important",
      maxWidth: '85.375rem',
      margin: '0 auto',
      width: '100%'
    }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Instrutor" {...tabProps(0)} />
          <Tab label="Curso" {...tabProps(1)} />
          <Tab label="Usuário" {...tabProps(2)} />
          <Tab label="Compra" {...tabProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Forms>
          <FormIntrutor atualizaInstrutor={atualizaInstrutor} setAtualizaInstrutor={setAtualizaInstrutor} />
        </Forms>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Forms>
          <FormCurso atualizaCurso={atualizaCurso} setAtualizaCurso={setAtualizaCurso} />
        </Forms>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Forms>
          <FormUsuario atualizaUsuario={atualizaUsuario} setAtualizaUsuario={setAtualizaUsuario} />
        </Forms>
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Three
      </TabPanel>
    </Box>
  );
}