import { api } from "@CarteBlanche/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  DialogActions,
  Modal,
  TextField,
} from "@mui/material";
import { Role } from "@prisma/client";
import { FormErrorMessage } from "./FormErrorMessage";
import { ChangeRolesInputDropdown } from "./input/manageAccounts/ChangeRolesInputDropdown";

// Interface for the form input
interface IFormInput {
  emailOfUserToChange: string;
  newRole: Role;
}

// Form validation schema using Zod
const updateRoleValidator = z.object({
  emailOfUserToChange: z.string().email("Invalid email address"),
  newRole: z.nativeEnum(Role),
});

/**
 * Default values for the form input
 */
const defaultFormValues = {
  emailOfUserToChange: "",
  newRole: Role.READER,
};

interface IManageAccountsForm {
  setOpenSuccessSnackbar: (open: boolean) => void;
  setSuccessSnackbarMessage: (message: string) => void;
  setOpenErrorSnackbar: (open: boolean) => void;
  setErrorSnackbarMessage: (message: string) => void;
}

export default function ManageAccountsForm({
  setOpenSuccessSnackbar,
  setSuccessSnackbarMessage,
  setOpenErrorSnackbar,
  setErrorSnackbarMessage,
}: IManageAccountsForm) {
  // States
  const [formErrorMessage, setFormErrorMessage] = useState("");

  // Form States
  const { handleSubmit, setValue, reset, control } = useForm<IFormInput>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(updateRoleValidator),
  });

  // API Calls
  const { data: session } = useSession();
  const { data: user } = api.user.getUser.useQuery(
    { id: session?.user.id },
    { refetchOnWindowFocus: false }
  );

  const {
    data: users,
    isLoading,
    error,
  } = api.user.getAllUsers.useQuery({}, { refetchOnWindowFocus: false });

  const { mutate: updateUser, isLoading: updatingUser } =
    api.user.updateUserRole.useMutation({
      onError(error) {
        setOpenErrorSnackbar(true);
        setErrorSnackbarMessage(error.message);
        setFormErrorMessage(error.message);
      },
      onSuccess() {
        setOpenSuccessSnackbar(true);
        setSuccessSnackbarMessage("User role successfully updated!");
        handleReset();
      },
    });

  /**
   * Handles the submission of the form
   * @param data
   * @returns
   */
  const onSubmit = (data: IFormInput) => {
    if (!session) {
      setOpenErrorSnackbar(true);
      setErrorSnackbarMessage("Error updating roles!");
      setFormErrorMessage("You must be logged in to update roles.");
      return;
    }

    const userToUpdate = {
      email: data.emailOfUserToChange,
      role: data.newRole,
    };

    updateUser(userToUpdate);
  };

  /**
   * Handles resetting of the form
   */
  const handleReset = () => {
    setFormErrorMessage("");
    reset(defaultFormValues);
  };

  if (isLoading || !users) {
    return (
      <CircularProgress
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      />
    );
  }
  if (error) {
    return <p>Oh no... {error.message}</p>;
  }
  const listOfUsers = users.map((user) => user.email);
  return (
    <>
      {updatingUser && (
        <Modal open={true}>
          <CircularProgress
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
          />
        </Modal>
      )}
      {formErrorMessage && (
        <FormErrorMessage errorMessage={`Error: ${formErrorMessage}`} />
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <Controller
          control={control}
          name="emailOfUserToChange"
          render={({ field: { value }, fieldState: { error } }) => {
            return (
              <Autocomplete
                value={value ?? ""}
                onChange={(_event, newValue) => {
                  setValue("emailOfUserToChange", newValue ?? "");
                }}
                options={listOfUsers}
                getOptionDisabled={(option) => option === user?.email}
                renderInput={(params) => (
                  <TextField
                    helperText={error ? error.message : null}
                    {...params}
                    error={!!error}
                    label="Users (by email)"
                  />
                )}
                fullWidth
              />
            );
          }}
        />
        <ChangeRolesInputDropdown
          name="newRole"
          control={control}
          label="New Role"
        />
      </Box>
      <DialogActions
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          marginTop: "20px",
          padding: "0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <Button
            onClick={() => {
              handleReset();
            }}
            variant="outlined"
          >
            Reset
          </Button>
        </Box>
        <Button
          onClick={() => void handleSubmit(onSubmit, (e) => console.log(e))()}
          variant="contained"
          style={{ backgroundColor: "#3576cb", color: "white" }}
        >
          Submit
        </Button>
      </DialogActions>
    </>
  );
}
