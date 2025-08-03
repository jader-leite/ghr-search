import React from "react";
import FavoriteButton from "../FavoriteButton";

type Props = {
  repos: unknown[];
};

export default function RepoList({ repos }: Props) {
  if (!repos.length) return <p className="text-gray-500 text-center">No repositories found.</p>;

  type Repo = { id: number; html_url: string; full_name: string; description: string | null };

  return (
    <ul className="space-y-4">
      {(repos as Repo[]).map((repo) => (
        <li key={repo.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <a 
                href={repo.html_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 font-semibold hover:underline block mb-1"
              >
                {repo.full_name}
              </a>
              {repo.description && (
                <p className="text-sm text-gray-700 line-clamp-2">
                  {repo.description}
                </p>
              )}
            </div>
            <div className="ml-4 flex-shrink-0">
              <FavoriteButton repo={repo} size="sm" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
