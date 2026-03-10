import React from 'react';
import styled from 'styled-components';

interface MapLayerSelectorProps {
    activeLayer: string;
    onChange: (layer: string) => void;
}

export const MapLayerSelector = ({ activeLayer, onChange }: MapLayerSelectorProps) => {
    return (
        <StyledWrapper>
            <div className="radio-group-container">
                <label className="radio-label">
                    <input
                        type="radio"
                        name="map-option"
                        className="radio-input"
                        checked={activeLayer === 'locations'}
                        onChange={() => onChange('locations')}
                    />
                    <span className="radio-custom" />
                    <span className="radio-text">Crime Locations</span>
                </label>
                <label className="radio-label">
                    <input
                        type="radio"
                        name="map-option"
                        className="radio-input"
                        checked={activeLayer === 'hotspots'}
                        onChange={() => onChange('hotspots')}
                    />
                    <span className="radio-custom" />
                    <span className="radio-text">Crime Hotspots</span>
                </label>
                <label className="radio-label">
                    <input
                        type="radio"
                        name="map-option"
                        className="radio-input"
                        checked={activeLayer === 'predictive'}
                        onChange={() => onChange('predictive')}
                    />
                    <span className="radio-custom" />
                    <span className="radio-text">Predictive Risk</span>
                </label>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .radio-group-container {
    background-color: var(--card);
    padding: 12px 24px;
    border-radius: 16px;
    border: 1px solid var(--border);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    width: 260px;
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  }

  .radio-label {
    display: flex;
    align-items: center;
    margin: 12px 0;
    cursor: pointer;
    position: relative;
    user-select: none;
  }

  .radio-input {
    display: none;
  }

  .radio-custom {
    width: 18px;
    height: 18px;
    background-color: transparent;
    border: 2px solid var(--secondary);
    border-radius: 50%;
    margin-right: 14px;
    position: relative;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .radio-custom::before {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    background: var(--text-secondary);
    border-radius: 50%;
    transform: scale(0);
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .radio-custom::after {
    content: "";
    position: absolute;
    width: 28px;
    height: 28px;
    border: 2px solid transparent;
    border-radius: 50%;
    border-top-color: var(--primary);
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.4s ease;
  }

  .radio-text {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    transition: color 0.3s ease;
  }

  .radio-label:hover .radio-input:not(:checked) + .radio-custom {
    transform: scale(1.1);
    border-color: var(--text-secondary);
  }

  .radio-label:hover .radio-text {
    color: var(--text-primary);
  }

  .radio-input:checked + .radio-custom {
    border-color: #00a6ff;
    transform: scale(0.9);
  }

  .radio-input:checked + .radio-custom::before {
    transform: scale(1);
    background-color: #00a6ff;
  }

  .radio-input:checked + .radio-custom::after {
    opacity: 1;
    transform: scale(1.3);
    animation: orbit 2.5s infinite linear;
    box-shadow:
      0 0 15px #00a6ff,
      0 0 40px rgba(0, 166, 255, 0.2);
  }

  .radio-input:checked ~ .radio-text {
    color: var(--text-primary);
    font-weight: 800;
  }

  .radio-label:nth-child(2) .radio-input:checked + .radio-custom {
    border-color: #e900ff;
    box-shadow: none;
  }
  .radio-label:nth-child(2) .radio-input:checked + .radio-custom::before {
    background-color: #e900ff;
  }
  .radio-label:nth-child(2) .radio-input:checked + .radio-custom::after {
    border-top-color: #e900ff;
    box-shadow:
      0 0 15px #e900ff,
      0 0 40px rgba(233, 0, 255, 0.2);
  }

  .radio-label:nth-child(3) .radio-input:checked + .radio-custom {
    border-color: #00ffc2;
    box-shadow: none;
  }
  .radio-label:nth-child(3) .radio-input:checked + .radio-custom::before {
    background-color: #00ffc2;
  }
  .radio-label:nth-child(3) .radio-input:checked + .radio-custom::after {
    border-top-color: #00ffc2;
    box-shadow:
      0 0 15px #00ffc2,
      0 0 40px rgba(0, 255, 194, 0.2);
  }

  @keyframes orbit {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
