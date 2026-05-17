'use client';

import { authClient } from '@/lib/auth-client';
import { TrashBin } from '@gravity-ui/icons';
import { AlertDialog, Button } from '@heroui/react';
import { redirect } from 'next/navigation';
// import { redirect } from 'next/dist/server/api-utils';

export function DeleteData({ destination }) {
  const { destinationName, _id } = destination;

  const handleDelete = async () => {
    const { data: tokenData } = await authClient.token();
    console.log(tokenData);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/destinations/${_id}`,
      {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          authorization: ` Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(destination),
      },
    );
    const data = await res.json();
    redirect('/destinations');
    console.log(data);
  };

  return (
    <AlertDialog>
      <Button variant="danger">
        <TrashBin /> Delete
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete Destination permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{destinationName}</strong>{' '}
                and all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
