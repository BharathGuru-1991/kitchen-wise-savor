
import React from 'react';
import Layout from '@/components/Layout';
import DonationDashboard from '@/components/DonationDashboard';
import { Toaster, toast } from '@/components/ui/sonner';

const DonationsPage = () => {
  return (
    <Layout>
      <DonationDashboard />
      <Toaster />
    </Layout>
  );
};

export default DonationsPage;
