#!/bin/bash

# Phase 2: Organizational Controls (20-32)
for i in {20..32}; do
  if [ ! -f "${i}-"*.md ]; then
    echo "Creating stub for ${i}"
  fi
done

# Phase 3: People Controls (40-47)
for i in {40..47}; do
  if [ ! -f "${i}-"*.md ]; then
    echo "Creating stub for ${i}"
  fi
done

# Phase 4: Physical Controls (50-63)
for i in {50..63}; do
  if [ ! -f "${i}-"*.md ]; then
    echo "Creating stub for ${i}"
  fi
done

# Phase 5: Technological Controls (70-103)
for i in {70..103}; do
  if [ ! -f "${i}-"*.md ]; then
    echo "Creating stub for ${i}"
  fi
done

# Phase 6: Integration (110-115)
for i in {110..115}; do
  if [ ! -f "${i}-"*.md ]; then
    echo "Creating stub for ${i}"
  fi
done

# Phase 7: Automation (120-123)
for i in {120..123}; do
  if [ ! -f "${i}-"*.md ]; then
    echo "Creating stub for ${i}"
  fi
done
