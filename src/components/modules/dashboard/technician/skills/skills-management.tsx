
"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  useAddNewSkill,
  useGetAllCategories,
  useGetMySkills,
  useRemoveMySkill,
} from "@/hooks";

import type { Category, TechnicianSkill } from "@/types";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Label } from "@/components/ui/label";

export default function SkillsManagement() {
  const queryClient = useQueryClient();

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [skillToRemove, setSkillToRemove] = useState<TechnicianSkill | null>(
    null,
  );

  // Queries
  const {
    data: skillsResponse,
    isLoading: skillsLoading,
    isError: skillsError,
  } = useGetMySkills();

  const {
    data: categoriesResponse,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetAllCategories();

  // Mutations
  const addSkillMutation = useAddNewSkill();
  const removeSkillMutation = useRemoveMySkill();

  const skills: TechnicianSkill[] = skillsResponse?.data ?? [];
  const categories: Category[] = categoriesResponse?.data ?? [];

  // Exclude categories already added by the technician
  const availableCategories = categories.filter(
    (category) => !skills.some((skill) => skill.categoryId === category.id),
  );

  // Add skill
  const handleAddSkill = () => {
    if (!selectedCategoryId) return;

    addSkillMutation.mutate(selectedCategoryId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["get-my-skills"],
        });

        setSelectedCategoryId("");
        setAddDialogOpen(false);
      },
    });
  };

  // Remove skill
  const handleRemoveSkill = () => {
    if (!skillToRemove) return;

    removeSkillMutation.mutate(skillToRemove.categoryId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["get-my-skills"],
        });

        setSkillToRemove(null);
      },
    });
  };

  return (
    <div className="space-y-4">
      {/* Table heading and Add button */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold">Your Skills</h2>
          <p className="text-sm text-muted-foreground">
            {skills.length} {skills.length === 1 ? "skill" : "skills"} added
          </p>
        </div>

        <Button
          onClick={() => setAddDialogOpen(true)}
          disabled={categoriesLoading || categoriesError}
        >
          Add New Skill
        </Button>
      </div>

      {/* Skills Table */}
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">#</TableHead>
              <TableHead>Skill</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {skillsLoading ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  Loading your skills...
                </TableCell>
              </TableRow>
            ) : skillsError ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-destructive"
                >
                  Unable to load your skills. Please try again.
                </TableCell>
              </TableRow>
            ) : skills.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center">
                  <p className="font-medium">No skills added yet</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Add your first skill to showcase your expertise.
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              skills.map((skill, index) => (
                <TableRow key={skill.id}>
                  <TableCell>{index + 1}</TableCell>

                  <TableCell className="font-medium">
                    {skill.category.name}
                  </TableCell>

                  <TableCell className="max-w-md text-muted-foreground">
                    {skill.category.description}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setSkillToRemove(skill)}
                      disabled={removeSkillMutation.isPending}
                      className={`rounded`}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Skill Dialog */}
      <Dialog
        open={addDialogOpen}
        onOpenChange={(open) => {
          setAddDialogOpen(open);

          if (!open) {
            setSelectedCategoryId("");
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Skill</DialogTitle>
            <DialogDescription>
              Select one category you want to add to your professional skills.
            </DialogDescription>
          </DialogHeader>

          {categoriesLoading ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Loading available categories...
            </p>
          ) : categoriesError ? (
            <p className="py-6 text-center text-sm text-destructive">
              Unable to load categories. Please try again.
            </p>
          ) : availableCategories.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              You have already added all available categories.
            </p>
          ) : (
            <RadioGroup
              value={selectedCategoryId}
              onValueChange={setSelectedCategoryId}
              className="max-h-72 space-y-3 overflow-y-auto py-2"
            >
              {availableCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-start gap-3 rounded-lg border p-3"
                >
                  <RadioGroupItem
                    value={category.id}
                    id={category.id}
                    className="mt-1"
                  />

                  <Label
                    htmlFor={category.id}
                    className="flex-1 cursor-pointer space-y-1"
                  >
                    <span className="block font-medium">{category.name}</span>
                    <span className="block text-sm font-normal text-muted-foreground">
                      {category.description}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          <DialogFooter>
            <Button
              onClick={handleAddSkill}
              disabled={
                !selectedCategoryId ||
                addSkillMutation.isPending ||
                availableCategories.length === 0
              }
            >
              {addSkillMutation.isPending ? "Adding..." : "Add New Skill"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove Confirmation Dialog */}
      <AlertDialog
        open={!!skillToRemove}
        onOpenChange={(open) => {
          if (!open && !removeSkillMutation.isPending) {
            setSkillToRemove(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove This Skill?</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to remove{" "}
              <span className="font-semibold text-foreground">
                {skillToRemove?.category.name}
              </span>{" "}
              from your skills? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={removeSkillMutation.isPending}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                handleRemoveSkill();
              }}
              disabled={removeSkillMutation.isPending}
              className="bg-destructive hover:bg-destructive/90"
            >
              {removeSkillMutation.isPending ? "Removing..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
