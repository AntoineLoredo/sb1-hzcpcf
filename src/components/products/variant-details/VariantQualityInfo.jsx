import React from 'react';

export function VariantQualityInfo({ variant, isEditing, editedVariant, onEdit }) {
  if (!isEditing) {
    return (
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-500">Quality Information</h4>
        <div className="mt-2 grid grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500">Defect Rate</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{(variant.qualityData.defectRate * 100).toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Return Rate</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{(variant.qualityData.returnRate * 100).toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Average Lifespan (months)</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{variant.qualityData.averageLifespan}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Warranty Period (months)</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{variant.qualityData.warrantyPeriod}</p>
          </div>
        </div>
        <div className="mt-4">
          <h5 className="text-sm font-medium text-gray-500">Quality Checks</h5>
          <div className="mt-2 space-y-2">
            {variant.qualityData.qualityChecks.map((check, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-500">{check.name}</span>
                <span className="font-medium text-gray-900">{check.score.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h4 className="text-sm font-medium text-gray-500">Quality Information</h4>
      <div className="mt-2 grid grid-cols-4 gap-4">
        <div>
          <label className="block text-xs text-gray-500">Defect Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={editedVariant?.qualityData.defectRate * 100}
            onChange={(e) => onEdit('qualityData', {
              ...editedVariant?.qualityData,
              defectRate: Number(e.target.value) / 100
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Return Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={editedVariant?.qualityData.returnRate * 100}
            onChange={(e) => onEdit('qualityData', {
              ...editedVariant?.qualityData,
              returnRate: Number(e.target.value) / 100
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Average Lifespan (months)</label>
          <input
            type="number"
            value={editedVariant?.qualityData.averageLifespan}
            onChange={(e) => onEdit('qualityData', {
              ...editedVariant?.qualityData,
              averageLifespan: Number(e.target.value)
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Warranty Period (months)</label>
          <input
            type="number"
            value={editedVariant?.qualityData.warrantyPeriod}
            onChange={(e) => onEdit('qualityData', {
              ...editedVariant?.qualityData,
              warrantyPeriod: Number(e.target.value)
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div className="mt-4">
        <h5 className="text-sm font-medium text-gray-500">Quality Checks</h5>
        {editedVariant?.qualityData.qualityChecks.map((check, index) => (
          <div key={index} className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500">Check Name</label>
              <input
                type="text"
                value={check.name}
                onChange={(e) => {
                  const newChecks = [...editedVariant.qualityData.qualityChecks];
                  newChecks[index] = { ...check, name: e.target.value };
                  onEdit('qualityData', {
                    ...editedVariant.qualityData,
                    qualityChecks: newChecks
                  });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Score</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={check.score}
                onChange={(e) => {
                  const newChecks = [...editedVariant.qualityData.qualityChecks];
                  newChecks[index] = { ...check, score: Number(e.target.value) };
                  onEdit('qualityData', {
                    ...editedVariant.qualityData,
                    qualityChecks: newChecks
                  });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}